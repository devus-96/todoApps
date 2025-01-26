function generateRandomJson() {
    const statusOptions = ['in progress', 'completed', 'waiting', 'canceled', 'plan'];
  
    const startDate = new Date(); // Date de début pour les calculs
    const randomDaysStart = Math.floor(Math.random() * 30); // Nombre de jours aléatoires à ajouter pour la date de début
    const randomDaysDeadline = randomDaysStart + Math.floor(Math.random() * 30) + 1; // Nombre de jours aléatoires à ajouter pour la date de fin (au moins 1 jour après le début)
  
    const startTimeHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const startTimeMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const endTimeHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const endTimeMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  
    const jsonObject = {
      "id": Math.floor(Math.random() * 1000), // ID aléatoire entre 0 et 999
      "name": "project" + Math.floor(Math.random() * 100), // Nom aléatoire depuis le tableau
      "creation": new Date().toLocaleDateString('fr-FR'), // Date de création (aujourd'hui)
      "start_time": `${startTimeHour}:${startTimeMinute}`, // Heure de début aléatoire
      "end_time": `${endTimeHour}:${endTimeMinute}`, // Heure de fin aléatoire
      "start_date": '21/01/2025', // Date de début aléatoire dans les 30 prochains jours
      "status": statusOptions[Math.floor(Math.random() * statusOptions.length)], // Statut aléatoire depuis le tableau
    };
  
    return jsonObject;
  }
  
  // Générer 20 objets JSON
  const generatedJsons = [];
  for (let i = 0; i < 10; i++) {
    generatedJsons.push(generateRandomJson());
  }
  
  // Afficher les JSONs générés (formatés pour la lisibilité)
  console.log(JSON.stringify(generatedJsons, null, 2));
  
 