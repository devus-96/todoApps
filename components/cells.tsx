"use client"
import clsx from "clsx";
interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    isActive?: boolean;
  }

const Cell:React.FC<Props> =  ({
    onClick,
    children,
    className,
    isActive
}) =>  {
    return (
        <div
        onClick={!isActive ? onClick : undefined}
        className={clsx(
          "flex flex-col select-none transition-colors",
          {
            "cursor-pointer hover:bg-gray-100 active:bg-gray-200":
              !isActive && onClick,
            " text-black bg-gray-100": isActive,
          },
          className
        )}
      >
        {children}
      </div>
    )
}

export default Cell