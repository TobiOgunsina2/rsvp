import MessagingResponse from "twilio/lib/twiml/MessagingResponse";

export async function POST(req: Request) {
  const formData = await req.formData();

  const phone = formData.get("From") as string;
  const body = (formData.get("Body") as string).trim().toUpperCase();

  const twiml = new MessagingResponse();

  if (body === "RSVP") {
    twiml.message(
      "Will you attend?\nReply YES, NO, or MAYBE."
    );
  }

  else if (
    body === "YES" ||
    body === "NO" ||
    body === "MAYBE"
  ) {
    twiml.message(
      `Thank you. RSVP recorded: ${body}`
    );

    // Save to Supabase here
  }

  else {
    twiml.message(
      "Send RSVP to begin."
    );
  }

  return new Response(twiml.toString(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}