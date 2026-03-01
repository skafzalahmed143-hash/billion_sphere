require('../../../shared/src/env');

const { buildApplicationService } = require('../../../shared/src/application-service');

const { app, port, serviceName } = buildApplicationService('gamorax');

app.listen(port, () => {
  console.log(`${serviceName} running on port ${port}`);
});
