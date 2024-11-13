import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { StartegyService } from 'src/startegy/startegy.service';
import { BarsRequestDto } from './dtos/barsRequest.dto';
import { CreateOrderDto } from './dtos/createOrder.dto';

@Injectable()
export class AlpacaService {
  private readonly logger = new Logger(AlpacaService.name);
  private apiVersion: string = 'v2';
  private tradingUrl: string = 'https://paper-api.alpaca.markets';
  private marketDataUrl: string = 'https://data.alpaca.markets';
  private apiKey: string;
  private secretKey: string;
  private tradingClient: AxiosInstance;
  private marketDataClient: AxiosInstance;
  private alpacaConfig: AlpacaConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly startegyService: StartegyService,
  ) {
    this.alpacaConfig = this.configService.get<AlpacaConfig>('alpaca', {
      infer: true,
    });
    this.apiKey = this.alpacaConfig.apiKey || '';
    this.secretKey = this.alpacaConfig.secretKey || '';

    if (!this.apiKey || !this.secretKey) {
      throw new Error('Alpaca API Key and Secret Key are required');
    }

    const axiosConfig = {
      headers: {
        'APCA-API-KEY-ID': this.apiKey,
        'APCA-API-SECRET-KEY': this.secretKey,
      },
    };

    this.tradingClient = axios.create({
      baseURL: this.tradingUrl + '/' + this.apiVersion,
      headers: axiosConfig.headers,
    });

    this.marketDataClient = axios.create({
      baseURL: this.marketDataUrl + '/' + this.apiVersion,
      headers: axiosConfig.headers,
    });
  }

  //create order
  async createOrder(order: CreateOrderDto) {
    try {
      const response = await this.tradingClient.post('/orders', order);
      return response.data;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  //get account
  async getAccount() {
    const response = await this.tradingClient.get('/account');
    return response.data;
  }

  //get assest
  async getAsset(symbol: string) {
    const response = await this.tradingClient.get(`/assets/${symbol}`);
    return response;
  }

  // get assests
  async getAssets() {
    const response = await this.tradingClient.get('/assets');
    return response.data;
  }

  //get smybol bars
  async getSymbolBars(barRequestDto: BarsRequestDto) {
    try {
      const response = await this.marketDataClient.get(`/stocks/bars`, {
        params: { ...barRequestDto },
      });
      return response.data?.bars;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  //get open high
  async getOpenHigh(barRequestDto: BarsRequestDto) {
    try {
      const response = await this.marketDataClient.get(`/stocks/bars`, {
        params: { ...barRequestDto },
      });
      const bars = response.data?.bars;
      const newResponse = [];
      Object.keys(bars).forEach((symbol) => {
        const openHighTimestamps =
          this.startegyService.evaluateOpenHighStrategy(bars[symbol]);
        newResponse.push({
          symbol,
          openHighTimestamps,
        });
      });
      return newResponse;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  //get open low
  async getOpenLow(barRequestDto: BarsRequestDto) {
    try {
      const response = await this.marketDataClient.get(`/stocks/bars`, {
        params: { ...barRequestDto },
      });
      const bars = response.data?.bars;
      const newResponse = [];
      Object.keys(bars).forEach((symbol) => {
        const openLowTimestamps = this.startegyService.evaluateOpenLowStrategy(
          bars[symbol],
        );
        newResponse.push({
          symbol,
          openLowTimestamps,
        });
      });
      return newResponse;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
