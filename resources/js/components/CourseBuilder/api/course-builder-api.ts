import axios from "axios";
import { ModuleData } from "../types/course";
export const courseBuilderApi = {
    getCourseContent: async ({course_id}: {course_id: string}) => {
        const response = await axios.get(`/courses/${course_id}/content`);
        console.log("getCourseContent", response.data);
        return response.data;
    },


    // Sections
    createSection: async ({course_id, title, order}: {course_id: string, title: string, order: number}) => {
        const response = await axios.post(route('courses.sections.store', { course_id: course_id }), {
            title: title,
            order: order,
            course_id: course_id,
        });
        console.log("createSection", response.data);
        return response.data;
    },

    // Modules
    createModule: async ({ section_id, type, title, order, data }: { section_id: string, type: string, title: string, order: number, data: ModuleData[keyof ModuleData] }) => {
       
        const response = await axios.post('/modules', {
            section_id: section_id,
            type: type,
            title: title,
            order: order,
            data,
        });
        console.log("createModule", response.data);
        return response.data;
    },

    updateModule: async ({ id, title, data }: {id: string,title: string, data: ModuleData[keyof ModuleData] }) => {
        const response = await axios.put(`/modules/${id}`, {
            title,
            data,
        });
        console.log("updateModule", response.data);
        return response.data;
    },
};
