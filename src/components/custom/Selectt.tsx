import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface SelecttProps{
      options:string[],
      onChange:(value:string)=>void,
      value:string | undefined,
      placeHolder:string,
  }
  
  const Selectt = ({options,onChange,placeHolder,value}:SelecttProps) => {
    return (
      <div>
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent>
              {options.map((item,i) => {
               return(<SelectItem key={i} value={item}>{item}</SelectItem>) 
              }
              )}
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  export default Selectt;
  