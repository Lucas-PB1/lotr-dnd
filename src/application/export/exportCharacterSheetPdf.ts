function slugifyFilename(name: string): string {
  return (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'personagem'
  );
}

export function characterSheetPdfFilename(characterName: string): string {
  const slug = slugifyFilename(characterName.trim() || 'heroi');
  return `ficha-${slug}.pdf`;
}

/** Captura um elemento HTML e gera PDF A4 para download. */
export async function exportCharacterSheetPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let offsetY = 0;
  let remaining = imgHeight;

  pdf.addImage(imgData, 'PNG', 0, offsetY, pageWidth, imgHeight);
  remaining -= pageHeight;

  while (remaining > 0) {
    offsetY = remaining - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, offsetY, pageWidth, imgHeight);
    remaining -= pageHeight;
  }

  pdf.save(filename);
}
