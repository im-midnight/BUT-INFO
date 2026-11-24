// =====================================================================
// AVIS.JS : formulaire « Donner un avis » (pages/site/avis.html)
//   - propose la liste des pages du site et pré-remplit la page d'où
//     l'on vient (lien du pied de page : avis.html?page=…)
//   - vérifie les champs, puis envoie l'avis à Web3Forms en JSON
//   - garde le texte si l'envoi échoue, pour ne rien perdre
// La clé Web3Forms se règle dans le HTML (champ caché access_key).
// =====================================================================

(() => {
  const form = document.getElementById("form-avis");
  if (!form) return;

  const champPage = document.getElementById("avis-page");
  const message = document.getElementById("avis-message");
  const email = document.getElementById("avis-email");
  const compteur = document.getElementById("compteur-message");
  const technique = document.getElementById("avis-technique");
  const infos = document.getElementById("avis-infos");
  const bouton = document.getElementById("avis-envoyer");
  const statut = document.getElementById("avis-statut");
  const MAX = Number(message.maxLength) || 3000;

  form.noValidate = true; // on affiche nos propres messages d'erreur

  // ── Liste des pages + page d'origine ────────────────────────────────
  const lesPages = typeof pages !== "undefined" ? pages : [];
  const lesMatieres = typeof matieres !== "undefined" ? matieres : [];
  const toutes = [...lesPages, ...lesMatieres]; // une page avant sa matière (même lien possible)

  const liste = document.getElementById("liste-pages");
  const vus = new Set();
  toutes.forEach((p) => {
    if (!p.titre || vus.has(p.titre)) return;
    vus.add(p.titre);
    const o = document.createElement("option");
    o.value = p.titre;
    liste.append(o);
  });

  const origine = new URLSearchParams(location.search).get("page");
  if (origine && !champPage.value) {
    const meme = (a, b) => a && b && a.normalize("NFC") === b.normalize("NFC");
    const trouvee = toutes.find((p) => meme(p.lien, origine));
    if (trouvee) champPage.value = trouvee.titre;
    else if (origine === "index.html") champPage.value = "Accueil";
    else if (/^[\w\-./%À-ÿ]+\.html$/.test(origine)) champPage.value = origine;
  }

  // ── Compteur de caractères ──────────────────────────────────────────
  const majCompteur = () => {
    compteur.textContent = `${message.value.length} / ${MAX}`;
  };
  message.addEventListener("input", majCompteur);
  majCompteur();

  // ── Vérification ────────────────────────────────────────────────────
  function marquer(champ, erreurId, ok) {
    const erreur = document.getElementById(erreurId);
    erreur.hidden = ok;
    if (champ) champ.setAttribute("aria-invalid", ok ? "false" : "true");
    return ok;
  }

  function verifier() {
    const typeOk = marquer(null, "erreur-type", !!form.querySelector('input[name="type"]:checked'));
    const messageOk = marquer(message, "erreur-message", message.value.trim().length >= 10);
    const emailOk = marquer(email, "erreur-email", email.value.trim() === "" || email.checkValidity());

    if (!typeOk) form.querySelector('input[name="type"]').focus();
    else if (!messageOk) message.focus();
    else if (!emailOk) email.focus();
    return typeOk && messageOk && emailOk;
  }

  // On retire l'erreur dès que la personne corrige
  form.addEventListener("change", (e) => {
    if (e.target.name === "type") marquer(null, "erreur-type", true);
  });
  message.addEventListener("input", () => {
    if (message.value.trim().length >= 10) marquer(message, "erreur-message", true);
  });
  email.addEventListener("input", () => {
    if (email.value.trim() === "" || email.checkValidity()) marquer(email, "erreur-email", true);
  });

  // ── Infos techniques (seulement si la case est cochée) ──────────────
  function infosTechniques() {
    if (!technique.checked) return "";
    const d = document.documentElement.dataset;
    return [
      `Navigateur : ${navigator.userAgent}`,
      `Écran : ${window.innerWidth}×${window.innerHeight} (zoom ${Math.round(window.devicePixelRatio * 100)} %)`,
      `Thème : ${d.theme || "?"}, mode ${d.mode || "?"}${d.hc === "on" ? ", contraste élevé" : ""}`,
    ].join("\n");
  }

  // ── Envoi ───────────────────────────────────────────────────────────
  function afficher(texte, type) {
    statut.textContent = texte;
    statut.className = `avis__statut avis__statut--${type}`;
    statut.hidden = false;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (bouton.disabled) return;
    if (!verifier()) return;

    const cle = form.elements.access_key.value.trim();
    if (!cle || cle.startsWith("METTRE-")) {
      afficher("Le formulaire n'est pas encore relié à notre boîte mail. Réessaie un peu plus tard.", "erreur");
      return;
    }

    infos.value = infosTechniques();
    const donnees = Object.fromEntries(new FormData(form));
    if (!donnees.page) donnees.page = "(tout le site)";
    if (!donnees.infos_techniques) delete donnees.infos_techniques;
    if (donnees.email) donnees.replyto = donnees.email;
    else delete donnees.email;
    donnees.subject = `Avis BUT INFO2 : ${donnees.type}`;

    bouton.disabled = true;
    bouton.textContent = "Envoi…";
    statut.hidden = true;

    try {
      const rep = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(donnees),
      });
      const json = await rep.json().catch(() => ({}));
      if (!rep.ok || json.success === false) throw new Error(json.message || rep.status);

      form.reset();
      technique.checked = true;
      majCompteur();
      afficher("Merci ! Ton avis est bien arrivé.", "ok");
    } catch (err) {
      console.error("Envoi de l'avis impossible :", err);
      afficher("L'envoi n'a pas marché. Ton message est toujours là, réessaie dans un moment.", "erreur");
    } finally {
      bouton.disabled = false;
      bouton.textContent = "Envoyer";
    }
  });
})();
