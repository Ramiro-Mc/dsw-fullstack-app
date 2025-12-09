import { test, expect } from '@playwright/test';

test('Navegación completa de la plataforma de cursos', async ({ page }) => {

    //primero va a la pag principal
  await page.goto('/');
  
  // espera que cargue la pagina
  await page.waitForLoadState('networkidle');
  
  // toma una captura de pantalla
  await page.screenshot({ path: 'screenshots/pagina-principal.png', fullPage: true });
  
  // verifica que haya cursos (busca los links de cursos)
  const cursos = page.locator('.card-link');
  const count = await cursos.count();
  
  expect(count).toBeGreaterThan(0);
  console.log(`✓ Se encontraron ${count} cursos en la página`);
  
  // hace click en el 1er curso
  await cursos.first().click();
  await page.waitForLoadState('networkidle');
  
  // verifica que llegó a la página de detalle del curso
  await expect(page).toHaveURL(/\/compraCurso\/\d+/);
  
  // hace otra captura de la info del curso
  await page.screenshot({ path: 'screenshots/detalle-curso.png', fullPage: true });
  
  console.log('Test completado exitosamente');
});