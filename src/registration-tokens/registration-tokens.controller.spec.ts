import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationTokensController } from './registration-tokens.controller';

describe('RegistrationTokens Controller', () => {
  let controller: RegistrationTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationTokensController],
    }).compile();

    controller = module.get<RegistrationTokensController>(RegistrationTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
