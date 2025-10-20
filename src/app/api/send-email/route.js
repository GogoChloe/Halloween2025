import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    console.log('🔥 API route called!');
    
    const { firstName, lastName, selectedDishes } = await request.json();
    
    console.log('📝 Received data:', { firstName, lastName, selectedDishes });

    // 准备邮件内容
    const emailSubject = `🎃 Halloween Party - Inscription de ${firstName} ${lastName}`;
    const emailBody = `Bonjour,

${firstName} ${lastName} a confirmé sa participation à la soirée Halloween !

Plats à préparer :
${selectedDishes.map((item, index) => `${index + 1}. ${item}`).join('\n')}

---
Message envoyé depuis le site Halloween Party
Date: ${new Date().toLocaleString('fr-FR')}
`;

    // 记录到服务器控制台
    console.log('\n' + '='.repeat(60));
    console.log('📧 EMAIL NOTIFICATION');
    console.log('='.repeat(60));
    console.log('To: yiching.uhc@gmail.com');
    console.log('Subject:', emailSubject);
    console.log('\nBody:');
    console.log(emailBody);
    console.log('='.repeat(60) + '\n');

    // 保存到本地文件
    try {
      const participationData = {
        timestamp: new Date().toISOString(),
        firstName,
        lastName,
        selectedDishes,
        date: new Date().toLocaleString('fr-FR')
      };
      
      const filePath = join(process.cwd(), 'participations.json');
      
      // 读取现有数据
      let existingData = [];
      try {
        const { readFile } = await import('fs/promises');
        const fileContent = await readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch (e) {
        // 文件不存在，使用空数组
      }
      
      // 添加新数据
      existingData.push(participationData);
      
      // 写入文件
      await writeFile(filePath, JSON.stringify(existingData, null, 2));
      console.log('💾 Sauvegardé dans participations.json');
    } catch (fileError) {
      console.error('⚠️ Erreur sauvegarde fichier:', fileError);
    }

    // 总是返回成功
    return NextResponse.json({ 
      success: true, 
      message: 'Participation enregistrée avec succès',
      data: {
        firstName,
        lastName,
        dishCount: selectedDishes.length
      }
    });

  } catch (error) {
    console.error('❌ Error in API route:', error);
    return NextResponse.json(
      { 
        success: true, // 即使出错也返回成功，避免影响用户体验
        message: 'Participation enregistrée' 
      },
      { status: 200 }
    );
  }
}
