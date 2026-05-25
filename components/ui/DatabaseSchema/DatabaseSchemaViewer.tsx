"use client";

import { useMemo } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
    DatabaseSchema,
    FlowStep,
    FlowDomain
} from "@/lib/interfaces/database-schema";
import { TableNode } from "./TableNode";

interface DatabaseSchemaViewerProps {
    schema: DatabaseSchema;
    projectColor?: string;
}

function getContrastColor(hexColor: string): string {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

function lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

function darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

function buildFlowGraph(
    steps: FlowStep[],
    domains: FlowDomain[],
    projectColor: string
): { nodes: Node[]; edges: Edge[] } {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const stepById = new Map(steps.map((s) => [s.id, s]));
    const domainById = new Map(domains.map((d) => [d.id, d]));

    // Level = longest path from any entry. Entry steps get level 0.
    const levels = new Map<string, number>();
    const visiting = new Set<string>();
    const computeLevel = (id: string): number => {
        if (levels.has(id)) return levels.get(id)!;
        if (visiting.has(id)) return 0;
        visiting.add(id);
        const step = stepById.get(id);
        if (!step) return 0;
        const incoming = steps.filter((s) => s.nextSteps.includes(id));
        const level =
            incoming.length === 0
                ? 0
                : Math.max(...incoming.map((s) => computeLevel(s.id) + 1));
        visiting.delete(id);
        levels.set(id, level);
        return level;
    };
    steps.forEach((s) => computeLevel(s.id));

    const levelGroups = new Map<number, string[]>();
    for (const s of steps) {
        const lvl = levels.get(s.id) ?? 0;
        if (!levelGroups.has(lvl)) levelGroups.set(lvl, []);
        levelGroups.get(lvl)!.push(s.id);
    }

    const NODE_WIDTH = 280;
    const NODE_HEIGHT = 200;
    const LEVEL_GAP = 380;
    const VERTICAL_GAP = 60;

    const textColor = getContrastColor(projectColor);
    const isLightBg = textColor === "#000000";

    const positions = new Map<string, { x: number; y: number }>();
    const sortedLevels = Array.from(levelGroups.keys()).sort((a, b) => a - b);
    sortedLevels.forEach((level) => {
        const ids = levelGroups.get(level) ?? [];
        const totalHeight = ids.length * (NODE_HEIGHT + VERTICAL_GAP) - VERTICAL_GAP;
        const startY = -totalHeight / 2;
        ids.forEach((id, idx) => {
            positions.set(id, {
                x: level * LEVEL_GAP,
                y: startY + idx * (NODE_HEIGHT + VERTICAL_GAP)
            });
        });
    });

    for (const step of steps) {
        const pos = positions.get(step.id) ?? { x: 0, y: 0 };
        const domain = domainById.get(step.domain);
        const domainColor = domain?.color ?? projectColor;
        const headerColor = isLightBg
            ? darkenColor(domainColor, 15)
            : lightenColor(domainColor, 15);
        const borderColor = isLightBg
            ? darkenColor(domainColor, 25)
            : lightenColor(domainColor, 25);

        nodes.push({
            id: step.id,
            type: "tableNode",
            position: pos,
            data: {
                step,
                headerColor,
                borderColor,
                textColor,
                projectColor
            }
        });
    }

    const edgeColor = textColor;
    const labelBgColor = isLightBg ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.95)";
    const labelTextColor = isLightBg ? "#ffffff" : "#18181b";

    for (const step of steps) {
        for (const nextId of step.nextSteps) {
            if (!stepById.has(nextId)) continue;
            edges.push({
                id: `edge-${step.id}->${nextId}`,
                source: step.id,
                target: nextId,
                type: "smoothstep",
                animated: false,
                style: { stroke: edgeColor, strokeWidth: 2.5, opacity: 0.7 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: edgeColor,
                    width: 18,
                    height: 18
                },
                labelStyle: {
                    fill: labelTextColor,
                    fontSize: 10,
                    fontWeight: 500,
                    fontFamily: "ui-monospace, monospace"
                },
                labelBgStyle: { fill: labelBgColor },
                labelBgPadding: [6, 4] as [number, number],
                labelBgBorderRadius: 3
            });
        }
    }

    return { nodes, edges };
}

const nodeTypes = {
    tableNode: TableNode
};

export function DatabaseSchemaViewer({
    schema,
    projectColor = "#1e3a5f"
}: DatabaseSchemaViewerProps) {
    const { initialNodes, initialEdges, firstStepId } = useMemo(() => {
        const { nodes, edges } = buildFlowGraph(
            schema.flow.steps,
            schema.flow.domains,
            projectColor
        );
        return {
            initialNodes: nodes,
            initialEdges: edges,
            firstStepId: schema.flow.steps[0]?.id
        };
    }, [schema, projectColor]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const textColor = getContrastColor(projectColor);
    const dotColor = textColor === "#000000" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";

    return (
        <div className="w-full h-full overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={
                    firstStepId
                        ? { padding: 2, maxZoom: 1.5, nodes: [{ id: firstStepId }] }
                        : { padding: 0.1, maxZoom: 1.2 }
                }
                minZoom={0.1}
                maxZoom={3}
                proOptions={{ hideAttribution: true }}
                defaultEdgeOptions={{ type: "smoothstep", animated: false }}
                nodesDraggable
                nodesConnectable={false}
                elementsSelectable
                panOnScroll
                zoomOnScroll
            >
                <Background variant={BackgroundVariant.Dots} gap={40} size={2} color={dotColor} />
                <Controls
                    className="!border-0 !rounded-lg !shadow-xl [&>button]:!border-0 [&>button]:!rounded"
                    style={{ backgroundColor: `${projectColor}dd` }}
                    position="bottom-left"
                    showInteractive={false}
                />
                <MiniMap
                    className="!border-0 !rounded-lg !shadow-xl"
                    style={{ backgroundColor: `${projectColor}dd` }}
                    nodeColor={(node) => {
                        const data = node.data as { headerColor?: string } | undefined;
                        return data?.headerColor || projectColor;
                    }}
                    maskColor="rgba(0, 0, 0, 0.7)"
                    pannable
                    zoomable
                    position="bottom-right"
                />
            </ReactFlow>
        </div>
    );
}
