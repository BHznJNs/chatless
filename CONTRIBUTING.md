# 贡献指南

感谢您对 chatless 项目的关注！我们欢迎所有形式的贡献。

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Rust 1.70+
- pnpm (推荐) 或 npm

### 本地开发设置
```bash
# 克隆仓库
git clone https://github.com/kamjin3086/chatless.git
cd chatless

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 📝 贡献类型

### 🐛 Bug 报告
如果您发现了 bug，请：
1. 检查是否已有相关 issue
2. 创建新的 issue，包含：
   - 详细的 bug 描述
   - 重现步骤
   - 预期行为 vs 实际行为
   - 环境信息（操作系统、版本等）

### 💡 功能请求
如果您有新功能想法，请：
1. 检查是否已有相关讨论
2. 创建 issue 描述您的想法
3. 说明为什么需要这个功能
4. 提供使用场景示例

### 🔧 代码贡献
如果您想贡献代码：

#### 1. Fork 项目
1. 在 GitHub 上 fork 本项目
2. 克隆您的 fork 到本地

#### 2. 创建分支
```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

#### 3. 开发
- 遵循现有的代码风格
- 添加必要的测试
- 确保所有测试通过
- 更新相关文档

#### 4. 提交代码
```bash
git add .
git commit -m "feat: add new feature description"
```

#### 5. 推送并创建 Pull Request
```bash
git push origin feature/your-feature-name
```

## 📋 开发规范

### 代码风格
- 使用 TypeScript
- 遵循 ESLint 和 Biome 规则
- 使用 Prettier 格式化代码
- 组件使用 PascalCase 命名
- 函数使用 camelCase 命名

### 提交信息规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
type(scope): description

[optional body]

[optional footer]
```

类型包括：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 测试
- 为新功能添加单元测试
- 确保现有测试通过
- 运行 `pnpm test` 验证

## 🏗️ 项目结构

```
src/
├── app/                 # Next.js 页面
├── components/          # React 组件
├── lib/                 # 核心库文件
├── store/               # 状态管理
├── types/               # TypeScript 类型定义
└── styles/              # 样式文件
```

## 🤝 社区

### 讨论
- 使用 [GitHub Discussions](https://github.com/kamjin3086/chatless/discussions) 进行讨论
- 提出想法、分享经验、寻求帮助

### 问题反馈
- 使用 [GitHub Issues](https://github.com/kamjin3086/chatless/issues) 报告问题
- 提供详细的信息和重现步骤

## 📄 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下发布。

## 🙏 致谢

感谢所有为 chatless 项目做出贡献的开发者！

---

如有任何问题，请随时在 [GitHub Discussions](https://github.com/kamjin3086/chatless/discussions) 中提问。 