export type Tasks = {
id?: string,
name: string; 
project?: string; 
assign: Record<string,any>; 
priority: string; 
state: string; 
start_date: Date | any; 
deadline: Date | any; 
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
image?: string;
description: string;
}

export type keySortTask = "assign" | "priority" | "state" | "daily" | "weeky" | "monthly"