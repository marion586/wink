export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const body = await readBody(event);
  const { profile } = body;

  if (!profile.firstName?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le prénom est requis',
    });
  }

  if (!profile.lastName?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le nom est requis',
    });
  }

  if (!profile.email?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'email est requis",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(profile.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'adresse email est invalide",
    });
  }

  return {
    success: true,
    message: 'Profil enregistré avec succès',
    data: {
      userId: Math.random().toString(36).substr(2, 9),
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      createdAt: new Date().toISOString(),
    },
  };
});
