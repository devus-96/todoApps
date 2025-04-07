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