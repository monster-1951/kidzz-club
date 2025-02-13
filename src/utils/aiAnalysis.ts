
export interface ActivityAnalysis {
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
  }
  
  export const analyzeActivity = (activities: any[]): ActivityAnalysis[] => {
    // This is a simplified version. In a real application, you'd want to use 
    // more sophisticated AI models for analysis.
    const analysis: ActivityAnalysis[] = [];
  
    const totalScreenTime = activities
      .filter(a => a.type === 'Entertainment')
      .reduce((acc, curr) => acc + parseInt(curr.duration), 0);
  
    const educationalTime = activities
      .filter(a => a.type === 'Education')
      .reduce((acc, curr) => acc + parseInt(curr.duration), 0);
  
    if (totalScreenTime > 120) {
      analysis.push({
        recommendation: "Screen time exceeds recommended limits. Consider outdoor activities.",
        priority: 'high',
        category: 'screen-time'
      });
    }
  
    if (educationalTime < 60) {
      analysis.push({
        recommendation: "Educational activity is below target. Try adding more learning sessions.",
        priority: 'medium',
        category: 'education'
      });
    }
  
    return analysis;
  };
  