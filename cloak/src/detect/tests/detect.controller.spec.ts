import { Test, TestingModule } from '@nestjs/testing';
import { DetectController } from '../detect.controller';
import { InjectionTokens } from '@types';
import { RequestDto } from '../detect.models';

describe('DetectController', () => {
  let controller: DetectController;

  const mockDetectService = {
    detectBotByRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetectController],
      providers: [
        {
          provide: InjectionTokens.DetectService,
          useValue: mockDetectService,
        },
      ],
    }).compile();

    controller = module.get<DetectController>(DetectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('detectBot', () => {
    it('should call detectService.detectBotByRequest with correct payload', async () => {
      const dto: RequestDto = {
        ip: '192.168.34.2',
        userAgent: 'Bot-Ebanat: 13.45.23',
      };

      const result = await controller.detectBot(dto);

      expect(result).not.toBeNull();
      expect(result?.isBot).toBe(true);
    });
  });
});
