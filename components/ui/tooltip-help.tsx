import { HelpCircle } from 'lucide-react';

interface TooltipHelpProps {
  text: string;
}

export const TooltipHelp = ({ text }: TooltipHelpProps) => (
  <span className="inline-flex items-center ml-2" title={text}>
    <HelpCircle className="w-4 h-4 text-purple-500 hover:text-purple-700 cursor-help" />
  </span>
);
