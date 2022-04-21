import { Package } from "../../../database.js";
import logger from "../../../logger.js";

export default async (c, req, res) => {
    const packageVersion = await Package.relatedQuery("versions")
        .for(c.request.params.packageID)
        .where("version", c.request.params.version)
        .first() // There will only be one, but no unique support for Objection.js
        .select(
            "id",
            "packageID",
            "version",
            "digest",
            "created_at",
            "updated_at"
        );

    logger.debug(
        `Found Package Version: ${JSON.stringify(
            packageVersion
        )}\nFor Package: ${c.request.params.packageID}\nFor Version: ${
            c.request.params.version
        }`
    );

    if (packageVersion) {
        return res.status(200).json(packageVersion);
    }

    res.status(404).json({ err: "package version not found" });
};
