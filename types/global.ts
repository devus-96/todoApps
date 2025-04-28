export type Tasks = {
id?: string,
name: string; 
assign: Record<string,any>; 
priority: string; 
state: string; 
start_date: Date; 
deadline: Date; 
author?:string,
creation?: Date; 
start_time?: string; 
end_time?: string; 
description?: string;
}

export type ProjectType = {
id?:string,
name: string;
objectifs?: Record<string,any>;
start_date: Date;
deadline: Date;
repeat?: string;
description?: string;
}

export type TeamType = {
    id?:string,
    name: string,
    creator: string,
    creation?:Date,
    description?:string
}

export type keySortTask = "assign" | "priority" | "state" | "daily" | "weeky" | "monthly"