import { Test, TestingModule } from '@nestjs/testing';

describe('File', () => {
  let provider: File;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [File],
    }).compile();

    provider = module.get<File>(File);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
