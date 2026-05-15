import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { nome, empresa, email, telefone, faturamento, investimento, servicos, orcamento, urgencia } = body;

  if (!nome || !email || !telefone || !empresa) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "DF COMPANY <onboarding@resend.dev>",
    to: "jotinhamarketing@gmail.com",
    replyTo: email,
    subject: `Novo lead: ${nome} — ${empresa}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0b;color:#fff;padding:32px;border-radius:12px;">
        <div style="margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.1);">
          <span style="background:#ff0000;color:#fff;font-size:11px;font-weight:700;letter-spacing:.1em;padding:4px 12px;border-radius:999px;text-transform:uppercase;">Novo Lead · DF COMPANY</span>
        </div>

        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;width:140px;">Nome</td><td style="padding:8px 0;font-weight:600;">${nome}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;">Empresa</td><td style="padding:8px 0;font-weight:600;">${empresa}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#ff0000;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;">WhatsApp</td><td style="padding:8px 0;"><a href="https://wa.me/55${telefone.replace(/\D/g, '')}" style="color:#25d366;">${telefone}</a></td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;">Faturamento</td><td style="padding:8px 0;">${faturamento || "Não informado"}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;">Investimento</td><td style="padding:8px 0;">${investimento || "Não informado"}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;vertical-align:top;">Serviços</td><td style="padding:8px 0;">${servicos?.length ? servicos.join(", ") : "Nenhum selecionado"}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;vertical-align:top;">Orçamento R$1.5k</td><td style="padding:8px 0;">${orcamento || "Não respondido"}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;font-size:13px;">Urgência</td><td style="padding:8px 0;">${urgencia ? `${urgencia} — ${{ A: "Baixa", B: "Média", C: "Alta" }[urgencia as "A"|"B"|"C"]}` : "Não informado"}</td></tr>
        </table>

        <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);">
          <a href="https://wa.me/55${telefone.replace(/\D/g, '')}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;">
            Responder no WhatsApp
          </a>
        </div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
