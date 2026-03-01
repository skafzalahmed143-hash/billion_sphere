require('../../../shared/src/env');

const { buildApplicationService } = require('../../../shared/src/application-service');

const { app, port, serviceName } = buildApplicationService('stoxenova');

app.listen(port, () => {
  console.log(`${serviceName} running on port ${port}`);
});
