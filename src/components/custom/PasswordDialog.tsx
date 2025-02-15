
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (success: boolean) => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({ isOpen, onClose, onVerify }) => {
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();
  const correctPassword = '1234'; // In a real app, this would be stored securely

  const handleVerify = () => {
    if (password === correctPassword) {
      onVerify(true);
      setPassword('');
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect password",
        description: "Please try again",
      });
      setPassword('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] backdrop-blur-sm bg-white/90">
        <DialogHeader>
          <DialogTitle>Enter Password to Reset Timer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="col-span-3"
          />
          <Button onClick={handleVerify} className="bg-black hover:bg-white hover:text-black">
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
