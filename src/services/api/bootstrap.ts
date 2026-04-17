/**
 * Bootstrap « client_data » / modèles additionnels — fork mécanique.
 * Aucun appel à `/api/claude_cli/bootstrap` ; le cache disque existant
 * (`clientDataCache`, `additionalModelOptionsCache` dans la config) reste lu
 * tel quel par le reste de l’app si déjà présent.
 */

export async function fetchBootstrapData(): Promise<void> {
	// no-op
}
