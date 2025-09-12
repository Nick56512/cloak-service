import { Test, TestingModule } from '@nestjs/testing';
import { DetectController } from '../detect.controller';
import { InjectionTokens } from '@types';
import { RequestDto } from '../detect.models';

describe('DetectController', () => {
  let controller: DetectController;

  // Мок сервіс з правильною типізацією
  const mockDetectService: {
    detectBotByRequest: (dto: RequestDto) => { isBot: boolean };
  } = {
    detectBotByRequest: (dto: RequestDto) => {
      return { isBot: dto.userAgent.includes('Bot') };
    },
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
    it('should return true for bot userAgent', async () => {
      const dto: RequestDto = {
        ip: '192.168.34.2',
        userAgent: 'Bot-Ebanat: 13.45.23',
      };

      const result = await controller.detectBot(dto);

      expect(result).toEqual({ isBot: true });
    });

    it('should return false for non-bot userAgent', async () => {
      const dto: RequestDto = {
        ip: '192.168.34.2',
        userAgent: 'Chrome',
      };

      const result = await controller.detectBot(dto);

      expect(result).toEqual({ isBot: false });
    });
  });
});
