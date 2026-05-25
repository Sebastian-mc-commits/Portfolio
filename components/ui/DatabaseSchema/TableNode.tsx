"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { FlowStep, FlowStepRole } from "@/lib/interfaces/database-schema";

interface FlowNodeData {
    step: FlowStep;
    headerColor: string;
    borderColor: string;
    textColor: string;
    projectColor: string;
}

const ROLE_LABEL: Record<FlowStepRole, string> = {
    entry: "ENTRY",
    service: "SERVICE",
    worker: "WORKER",
    store: "STORE",
    external: "EXTERNAL",
    output: "OUTPUT"
};

function FlowStepNodeComponent({ data }: NodeProps) {
    const { step, borderColor, textColor } = data as unknown as FlowNodeData;

    const isLightText = textColor === "#ffffff";
    const cardBg = isLightText ? "#18181b" : "#ffffff";
    const cardBorder = isLightText ? "#27272a" : "#e4e4e7";
    const headerBg = isLightText ? "#1f1f23" : "#fafafa";
    const titleColor = isLightText ? "#fafafa" : "#18181b";
    const subText = isLightText ? "#a1a1aa" : "#71717a";
    const bodyText = isLightText ? "#d4d4d8" : "#3f3f46";
    const borderLight = isLightText ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

    return (
        <div
            className="rounded-xl overflow-hidden"
            style={{
                width: 280,
                backgroundColor: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: isLightText
                    ? "0 1px 0 rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.4)"
                    : "0 1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)"
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="!w-[7px] !h-[7px] !border-[1.5px]"
                style={{ backgroundColor: cardBg, borderColor, left: -3.5 }}
            />

            <div
                className="flex items-center gap-2 px-3 py-2.5"
                style={{ backgroundColor: headerBg, borderBottom: `1px solid ${cardBorder}` }}
            >
                <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: borderColor }}
                />
                <span
                    className="font-semibold text-[13px] tracking-tight truncate"
                    style={{ color: titleColor }}
                >
                    {step.title}
                </span>
                <span
                    className="ml-auto text-[9px] font-bold tracking-wider"
                    style={{
                        color: borderColor,
                        fontFamily: "ui-monospace, monospace"
                    }}
                >
                    {ROLE_LABEL[step.role]}
                </span>
            </div>

            <div className="px-3 py-2.5">
                <p
                    className="text-[11.5px] leading-snug mb-2"
                    style={{ color: bodyText }}
                >
                    {step.description}
                </p>
            </div>

            {(step.inputs.length > 0 || step.outputs.length > 0) && (
                <div style={{ borderTop: `1px solid ${borderLight}` }}>
                    {step.inputs.length > 0 && (
                        <div className="px-3 py-1.5 grid gap-2" style={{ gridTemplateColumns: "44px 1fr" }}>
                            <span
                                className="text-[9px] font-bold tracking-wider"
                                style={{ color: subText, fontFamily: "ui-monospace, monospace" }}
                            >
                                IN
                            </span>
                            <span
                                className="text-[11px]"
                                style={{ color: bodyText, fontFamily: "ui-monospace, monospace" }}
                            >
                                {step.inputs.join(", ")}
                            </span>
                        </div>
                    )}
                    {step.outputs.length > 0 && (
                        <div
                            className="px-3 py-1.5 grid gap-2"
                            style={{
                                gridTemplateColumns: "44px 1fr",
                                borderTop: step.inputs.length > 0 ? `1px solid ${borderLight}` : "none"
                            }}
                        >
                            <span
                                className="text-[9px] font-bold tracking-wider"
                                style={{ color: subText, fontFamily: "ui-monospace, monospace" }}
                            >
                                OUT
                            </span>
                            <span
                                className="text-[11px]"
                                style={{ color: bodyText, fontFamily: "ui-monospace, monospace" }}
                            >
                                {step.outputs.join(", ")}
                            </span>
                        </div>
                    )}
                </div>
            )}

            <Handle
                type="source"
                position={Position.Right}
                className="!w-[7px] !h-[7px] !border-[1.5px]"
                style={{ backgroundColor: cardBg, borderColor, right: -3.5 }}
            />
        </div>
    );
}

export const TableNode = memo(FlowStepNodeComponent);
export const FlowStepNode = TableNode;
