import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationTokensService } from './registration-tokens.service';

describe('RegistrationTokensService', () => {
  let service: RegistrationTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationTokensService],
    }).compile();

    service = module.get<RegistrationTokensService>(RegistrationTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
