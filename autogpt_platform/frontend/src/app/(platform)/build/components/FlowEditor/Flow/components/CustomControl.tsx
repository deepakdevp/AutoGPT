import { useReactFlow } from "@xyflow/react";
import { Button } from "@/components/atoms/Button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";
import {
  FrameCornersIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { memo } from "react";

export const CustomControls = memo(
  ({
    setIsLocked,
    isLocked,
  }: {
    isLocked: boolean;
    setIsLocked: (isLocked: boolean) => void;
  }) => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    const controls = [
      {
        id: "zoom-in-button",
        icon: <PlusIcon className="size-3.5 text-zinc-600" />,
        label: "Zoom In",
        onClick: () => zoomIn(),
        className: "h-10 w-10 border-none",
      },
      {
        id: "zoom-out-button",
        icon: <MinusIcon className="size-3.5 text-zinc-600" />,
        label: "Zoom Out",
        onClick: () => zoomOut(),
        className: "h-10 w-10 border-none",
      },
      {
        id: "fit-view-button",
        icon: <FrameCornersIcon className="size-3.5 text-zinc-600" />,
        label: "Fit View",
        onClick: () => fitView({ padding: 0.2, duration: 800, maxZoom: 1 }),
        className: "h-10 w-10 border-none",
      },
      {
        id: "lock-button",
        icon: !isLocked ? (
          <LockOpenIcon className="size-3.5 text-zinc-600" />
        ) : (
          <LockIcon className="size-3.5 text-zinc-600" />
        ),
        label: "Toggle Lock",
        onClick: () => setIsLocked(!isLocked),
        className: `h-10 w-10 border-none ${isLocked ? "bg-zinc-100" : "bg-white"}`,
      },
    ];

    return (
      <div
        data-id="custom-controls"
        className="absolute bottom-4 left-4 z-10 flex flex-col items-center gap-2 rounded-full bg-white px-1 py-2 shadow-lg"
      >
        {controls.map((control) => (
          <Tooltip key={control.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="icon"
                size={"small"}
                onClick={control.onClick}
                className={control.className}
                data-id={control.id}
                disabled={"disabled" in control ? control.disabled : false}
              >
                {control.icon}
                <span className="sr-only">{control.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{control.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  },
);

CustomControls.displayName = "CustomControls";
