import { Telegraf, Context, Markup } from 'telegraf';
import axios from 'axios';
import 'dotenv/config';

import IPaymentResponse from '../interfaces/IPaymentResponse';


export default class BotController {
  private bot: Telegraf;
  private readonly privateChannel = process.env.Telegram_Channel; // Nome do canal privado
  private readonly paymentUrl = process.env.Payment_URL; // URL do pagamento

  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN as string);
    this.setupCommands();
  }

  private setupCommands() {
    this.bot.start((ctx: Context) => this.startCommand(ctx));
    this.bot.action('comprar', (ctx: Context) => this.sendPaymentLink(ctx));
  }

  private async startCommand(ctx: Context) {
    await ctx.reply(
      `Welcome, honey! To get access to all my delights on ${process.env.Telegram_Channel_Name}, you need to purchase a pass. Click the button below:`,
      Markup.inlineKeyboard([[Markup.button.callback('Comprar Acesso', 'comprar')]])
    );
  }

  private async sendPaymentLink(ctx: Context) {
    await ctx.reply(`Clique no link para pagar: ${this.paymentUrl}`);
  }

  async verificarPagamento(idPagamento: string): Promise<boolean> {
    try {
      const { data } = await axios.get<IPaymentResponse>(`https://api.mercadopago.com/v1/payments/${idPagamento}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      });

      return data.status === 'approved';
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      return false;
    }
  }

  async adicionarUsuarioAoCanal(userId: number) {
    try {
      if (this.privateChannel) {
        const inviteLink = await this.bot.telegram.exportChatInviteLink(this.privateChannel);
        await this.bot.telegram.sendMessage(userId, `Aqui está seu convite: ${inviteLink}`);
      } else {
        console.error('Canal privado não definido.');
      }
    } catch (error) {
      console.error('Erro ao adicionar usuário ao canal:', error);
    }
  }

  start() {
    this.bot.launch();
    console.log('🤖 Bot iniciado!');
  }
}

const botInstance = new BotController();
botInstance.start();
