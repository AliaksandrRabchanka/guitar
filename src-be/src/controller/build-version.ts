import { Request, Response } from 'express';

export class BuildVersionController {
  private readonly buildVersion: string;

  constructor(buildVersion: string) {
    this.buildVersion = buildVersion;
  }

  public getBuildVersion() {
    return (request: Request, response: Response): void => {
      response.send({
        beBuild: this.buildVersion,
      });
    };
  }
}