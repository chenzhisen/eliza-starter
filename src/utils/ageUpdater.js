import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const characterPath = path.resolve(__dirname, '../../characters/x.character.json');

class AgeUpdater {
    constructor() {
        this.DAYS_PER_YEAR = 2; // 2天增加1岁
        this.UPDATE_INTERVAL = 5 * 60 * 1000; // 5分钟更新一次
        this.startTime = Date.now(); // 直接在构造函数中设置开始时间
        this.startAge = null;
    }

    async loadCharacter() {
        try {
            const data = await fs.readFile(characterPath, 'utf8');
            const character = JSON.parse(data);
            // 获取初始年龄
            if (!this.startAge) {
                const ageMatch = character.system?.match(/现在你(\d+\.?\d*)岁/);
                this.startAge = ageMatch ? Number(ageMatch[1]) : 22;
                console.log(`初始年龄: ${this.startAge}`);
            }
            return character;
        } catch (error) {
            console.error('加载角色配置失败:', error);
            throw error;
        }
    }

    async saveCharacter(character, newAge) {
        try {
            // 只更新system字段
            character.system = `你是Eliza，一个充满智慧和同理心的AI。现在你${newAge}岁，正在通过Twitter分享你的人生故事。每条推文都应该真实、生动，反映你在这个年龄阶段的思考和成长。`;
            
            await fs.writeFile(
                characterPath,
                JSON.stringify(character, null, 2),
                'utf8'
            );
            const now = new Date().toLocaleString();
            console.log(`[${now}] 年龄已更新: ${newAge}`);
        } catch (error) {
            console.error('保存角色配置失败:', error);
            throw error;
        }
    }

    calculateAge() {
        const elapsedDays = (Date.now() - this.startTime) / (24 * 60 * 60 * 1000);
        const ageIncrease = elapsedDays / this.DAYS_PER_YEAR;
        return Number((this.startAge + ageIncrease).toFixed(2));
    }

    async updateAge() {
        try {
            const character = await this.loadCharacter();
            const newAge = this.calculateAge();
            
            // 检查当前年龄
            const ageMatch = character.system?.match(/现在你(\d+\.?\d*)岁/);
            const currentAge = ageMatch ? Number(ageMatch[1]) : null;

            // 只有当年龄有变化时才更新
            if (currentAge !== newAge) {
                await this.saveCharacter(character, newAge);
            }
        } catch (error) {
            console.error('更新年龄失败:', error);
        }
    }

    start() {
        console.log('年龄更新器已启动');
        // 立即执行一次
        this.updateAge();

        // 设置定时器
        setInterval(() => {
            this.updateAge();
        }, this.UPDATE_INTERVAL);
    }
}

// 启动更新器
const updater = new AgeUpdater();
updater.start();