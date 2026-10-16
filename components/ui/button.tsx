import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[.95rem] font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-[#315f37] hover:shadow-md",
        secondary: "border border-border/80 bg-card text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:border-[#a9c9a9] hover:bg-[#eef5ed] hover:text-[#315f37]",
        soft: "border border-border/80 bg-card text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:border-[#a9c9a9] hover:bg-[#eef5ed] hover:text-[#315f37]",
        ghost: "text-foreground hover:bg-secondary hover:text-[#315f37]",
        outline: "border border-input bg-card text-foreground hover:border-[#a9c9a9] hover:bg-[#eef5ed] hover:text-[#315f37]",
      },
      size: { default: "h-11 px-7", sm: "h-9 px-5 text-sm", icon: "size-11" },
    },
    defaultVariants: { variant: "soft", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
