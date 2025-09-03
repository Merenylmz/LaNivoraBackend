import { IParfume } from "../Models/Parfume.model";

interface IParfumeInterface{
    getAllParfume(isAdminPanel: Boolean): Promise<Array<IParfume>>,
    getBySlugParfume(slug: String, isAdminPanel: Boolean): Promise<IParfume>,
    addParfume(data: Promise<IParfume>): Promise<void>,
    deleteParfume(slug: String): Promise<Boolean>,
    editParfume(slug: String, data: Promise<IParfume>): Promise<any>
};

export default IParfumeInterface;