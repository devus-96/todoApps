function generateRandomJson2() {
    const roles = ['Développeur', 'Testeur', 'Chef de projet', 'Designer'];
    const statusOptions = ['in progress', 'completed', 'waiting', 'canceled', 'plan'];
  
    const baseJson = {
      "id": Math.floor(Math.random() * 1000),
      "name": "project " + Math.floor(Math.random() * 100), // Nom aléatoire
      "creation": new Date().toLocaleDateString('fr-FR'), // Date du jour
      "start_date": new Date(Date.now() + Math.floor(Math.random() * 30) * 86400000).toLocaleDateString('fr-FR'), // Date aléatoire dans les 30 jours
      "deadline": new Date(Date.now() + (Math.floor(Math.random() * 60) + 30) * 86400000).toLocaleDateString('fr-FR'), // Date aléatoire dans les 60-90 jours
      "status": statusOptions[Math.floor(Math.random() * statusOptions.length)],
      "task": [
        // Copie de l'objet principal (pour la démonstration)
      ],
      "menbers": Array.from({ length: 3 }, () => ({ // Génère 3 membres
        "name": `Membre ${Math.floor(Math.random() * 100)}`,
        "role": roles[Math.floor(Math.random() * roles.length)],
        "email": `membre${Math.floor(Math.random() * 100)}@example.com`
      }))
    };
      
    return JSON.parse(JSON.stringify(baseJson)); // Copie profonde
  }
  
  const generatedJsons2 = [];
  for (let i = 0; i < 5; i++) {
    generatedJsons2.push(generateRandomJson2());
  }
  
  console.log(JSON.stringify(generatedJsons2, null, 2));