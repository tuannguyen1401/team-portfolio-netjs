
import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

// --- Khởi tạo Telegram bot (singleton ở mức module) ---
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const bot = TOKEN ? new TelegramBot(TOKEN, { polling: false }) : null;

// DTO tối giản (3 field)
type ContactFormDto = {
  fullName: string; // Họ và tên
  email: string;    // Email
  message: string;  // Tin nhắn
};

@Controller('contact')
export class ContactController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async sendToTelegram(@Body() body: ContactFormDto) {
    // Kiểm tra env
    if (!bot || !CHAT_ID) {
      throw new HttpException(
        'Server chưa cấu hình TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Lấy và làm sạch input
    const fullName = (body.fullName ?? '').trim();
    const email = (body.email ?? '').trim();
    const message = (body.message ?? '').trim();

    // Validate siêu gọn
    if (!fullName || !email || !message) {
      throw new HttpException('Thiếu trường fullName/email/message', HttpStatus.BAD_REQUEST);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new HttpException('Email không hợp lệ', HttpStatus.BAD_REQUEST);
    }

    // Nội dung gửi Telegram
    const text =
      `📩 *Contact Form mới*\n` +
      `• Họ và tên: ${fullName}\n` +
      `• Email: ${email}\n` +
      `• Tin nhắn:\n${message}`;

    // Gửi (dùng Markdown đơn giản, fallback text nếu lỗi)
    try {
      await bot.sendMessage(CHAT_ID, text, { parse_mode: 'Markdown' });
    } catch {
      // Nếu Markdown lỗi (ký tự đặc biệt), gửi lại plain-text
      await bot.sendMessage(CHAT_ID, text);
    }

    return { ok: true, message: 'Đã gửi thành công' };
  }
}
