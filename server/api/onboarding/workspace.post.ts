export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const body = await readBody(event);
  const { workspace } = body;

  if (!workspace.companyName?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Le nom de l'entreprise est requis",
    });
  }

  if (!workspace.description?.trim() || workspace.description.length < 10) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La description doit contenir au moins 10 caractères',
    });
  }

  if (workspace.siteUrl && !isValidUrl(workspace.siteUrl)) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'URL du site web est invalide",
    });
  }
  return {
    success: true,
    message: 'Espace de travail créé avec succès',
    data: {
      workspaceId: Math.random().toString(36).substr(2, 9),
      ...workspace,
    },
  };
});

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
