document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pigeonForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nom = document.getElementById("nom").value.trim();
      const prenom = document.getElementById("prenom").value.trim();
      const numero = document.getElementById("numero").value.trim();

      const pigeonRegex = /^[0-9]{3}[A-Z]{3}$/;
      if (!pigeonRegex.test(numero)) {
        alert("Le numéro de pigeon doit être au format 600YKR.");
        return;
      }

      // Enregistrement local
      const data = JSON.parse(localStorage.getItem("employé")) || [];
      data.push({ nom, prenom, numero });
      localStorage.setItem("pigeons", JSON.stringify(data));

      // Envoi webhook
      const webhookURL = "https://discord.com/api/webhooks/1380889990615138355/9SNKSu6YHeMA-TEkg9l-gGisXdWUBp-k8DD1uT1oh8WvN7D3eAbDuMQFwsCUKPWwd4xV";
      fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🕊️ **Nouveau employé enregistré !**\n**Nom** : ${nom}\n**Prénom** : ${prenom}\n**Numéro** : ${numero}`
        })
      });

      alert("Formulaire envoyé avec succès !");
      form.reset();
    });
  }
});
