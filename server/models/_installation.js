const ModelValidationError = require('./errors/ModelValidationError');

class Installation {
    constructor (installation) {
        validateInstallation(installation);
        this.installationTime = new Date(installation.installationTime);
        this.installer = String(installation.installer);
    }
}

function validateInstallation (installation) {
    if (!installation.installationTime) {
        throw new ModelValidationError(
            `Installation should have 'installationTime' property, got: ${installation.installationTime}`
        );
    }

    if (!installation.installer) {
        throw new ModelValidationError(
            `Installation should have 'installer' property, got: ${installation.installer}`
        );
    }
}

module.exports = {
    Installation
};