import { Package } from "../../../database.js";
import logger from "../../../logger.js";

export default async (c, req, res) => {
    const foundPackage = await Package.query()
        .findById(c.request.params.package_id)
        .select(
            "id",
            "name",
            "description",
            "source",
            "home",
            "license",
            "created_at",
            "updated_at"
        );

    logger.debug(
        `Found Package: ${JSON.stringify(foundPackage)}\nFor ID: ${
            c.request.params.package_id
        }`
    );

    if (foundPackage) {
        return res.status(200).json(foundPackage);
    }

    res.status(404).json({ err: "package not found" });
};
