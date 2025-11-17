export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const body = await readBody(event);
  const { preferences } = body;

  if (!preferences.role?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le rôle est requis',
    });
  }

  if (!preferences.teamSize?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "La taille de l'équipe est requise",
    });
  }

  if (!preferences.goals || preferences.goals.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Au moins un objectif doit être sélectionné',
    });
  }

  return {
    success: true,
    message: 'Préférences enregistrées avec succès',
    data: {
      userId: Math.random().toString(36).substr(2, 9),
      ...preferences,
      createdAt: new Date().toISOString(),
    },
  };
});
