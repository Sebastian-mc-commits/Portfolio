/**
 * Explanation-flow schema.
 *
 * Each project's JSON describes the SYSTEM as a directed flow of steps
 * (entry → services / workers → stores → outputs), not as a raw DB dump.
 * The file name on disk is kept (database-schema.d.ts) so existing imports
 * don't break, but the types here describe a flow diagram, not a schema.
 */

export type FlowStepRole =
    | "entry"     // external trigger / inbound request
    | "service"   // synchronous service / API
    | "worker"    // background job / async processor
    | "store"     // persistence layer (db, cache, vector store, blob)
    | "external"  // third-party system
    | "output";   // outbound response / artifact

export interface FlowStep {
    id: string;
    title: string;
    role: FlowStepRole;
    domain: string;              // FlowDomain.id this step belongs to
    description: string;
    inputs: string[];
    outputs: string[];
    nextSteps: string[];         // FlowStep.id values
}

export interface FlowDomain {
    id: string;
    name: string;
    description: string;
    color?: string;
}

export interface ProjectFlowExplanation {
    schemaVersion: "explanation-flow.v2";
    project: {
        id: string;
        title: string;
        description: string;
    };
    flow: {
        title: string;
        description: string;
        domains: FlowDomain[];
        steps: FlowStep[];
    };
}

// Backwards-compatible alias so existing imports `DatabaseSchema` still resolve.
// (Naming-only — the content is now a flow explanation, not a DB schema.)
export type DatabaseSchema = ProjectFlowExplanation;
