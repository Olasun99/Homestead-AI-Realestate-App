const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.notifyAgentOnConsultation = functions.firestore
  .document("consultations/{consultationId}")
  .onCreate(async (snap, context) => {
    const consultation = snap.data();
    
    console.log("New consultation requested:", consultation);
    
    // In a real application, you would integrate with an email provider like SendGrid, Mailgun, or Firebase Extension (Trigger Email).
    // Here we simulate storing a notification that the agent dashboard or an email worker can process.
    
    await admin.firestore().collection("notifications").add({
      type: "email",
      to: "agent@example.com", // This would be dynamic based on the assigned agent
      subject: `New Consultation Request: ${consultation.consultationType}`,
      message: `You have a new ${consultation.consultationType} consultation request from ${consultation.name} on ${consultation.date} at ${consultation.time}.`,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return null;
  });
