Section 1: Modules

共 6 个分类、70 个子模块，另有 14 个整模型预设（Models 页）。
分类定义：`src/components/types.ts`；注册表：`src/components/registry.ts`。

## Core 核心组件（11）

| 子模块 | 算法/变体 | 可调参数 |
|---|---|---|
| Attention | MHA / GQA / MQA / Linear / Sliding Window / Cross / Sparse(BigBird·Longformer·Fixed) / MLA / Ring / RoPE·ALiBi / Flash / Paged | d_model, n_heads, n_kv_heads, seq_len, bias, window size, KV latent dim, block size, 并发序列, GPU 数 |
| MLP | Standard(ReLU/GELU) / SwiGLU / GeGLU / ReGLU / GLU / Squared ReLU | d_model, d_ff, seq_len, bias, 激活函数 |
| Normalization | RMSNorm / LayerNorm / GroupNorm / InstanceNorm / BatchNorm | 归一化维度, seq_len, num_groups |
| Embedding | RoPE / Learned / ALiBi / Sinusoidal | vocab size, d_model, max_seq_len |
| Transformer Block | Pre/Post-Norm × RMSNorm/LayerNorm × MHA·GQA·MQA × SwiGLU·GeGLU·Standard | d_model, n_heads, n_kv_heads, d_ff, seq_len |
| MoE Layer | SwiGLU / Standard 专家 | d_model, d_ff(每专家), n_experts, top_k, seq_len |
| Residual Connection | Pre-Norm / Post-Norm / DeepNorm / Sandwich / Parallel(PaLM) | d_model, seq_len, 层数, DeepNorm α |
| LM Head | Untied / Tied Weights / MoE Head | d_model, vocab size, seq_len, 专家数 |
| Positional Encoding | Sinusoidal / Learned / RoPE / ALiBi / YaRN | d_model, seq_len, n_heads, RoPE base θ, 目标上下文 |
| Architecture Comparison | Overview / Attention Choices / FFN-MoE / Training & Scale | — |
| RAG Architecture | RAG Pipeline / Chunking & Retrieval / Advanced RAG | chunk size, top-k, embed dim |

## Functions 基础函数（10）

| 子模块 | 算法/变体 | 可调参数 |
|---|---|---|
| Softmax | Naive / Safe(减最大值) / Online 单遍 | 向量长度, temperature |
| Cross Entropy Loss | Standard / Label Smoothing | vocab size, 平滑 α |
| Matrix Multiplication | 分块矩阵乘 | M, N, K, tile size |
| Activation Functions | All(对比) / ReLU / GELU / SiLU·Swish | 输入 x |
| Tokenizer | BPE / SentencePiece(Unigram) / WordPiece | vocab size |
| Decoding Strategies | Greedy / Top-K / Top-P(Nucleus) / Beam Search | temperature, top-k, top-p, beam width, vocab size |
| Backpropagation | 计算图 / 链式法则 / 显存分析 | d_model, 层数, seq_len, batch size, 精度(FP32/BF16/FP16) |
| Dropout | Standard / DropPath(Stochastic Depth) / DropConnect | drop rate, d_model, 层数 |
| Weight Initialization | Xavier·Glorot / Kaiming·He / Small Init / Truncated Normal | fan in, fan out, 层数, 激活函数 |
| Normalization Comparison | Overview / 归一化维度 / 训练动态 | batch size, seq len, d_model, num groups |
## Optimization 优化与推理（23）

| 子模块 | 算法/变体 | 可调参数 |
|---|---|---|
| Flash Attention | 分块 + online softmax | seq_len, d_head, SRAM block size |
| KV Cache | Standard / Prefix Caching(RadixAttention) | seq_len, d_model, heads, kv_heads, layers, batch, dtype(FP16/FP8/INT8) |
| Quantization | Absmax(对称) / Zero-Point(非对称) / Per-Channel；INT8·INT4·FP8(E4M3) | d_model, 层数 |
| PagedAttention (vLLM) | 分页 KV 管理 | block size, seq_len, 并发序列 |
| Prefill vs Decode | Overview / Roofline Model / Optimization | seq_len, 生成长度, batch size, 模型规模 |
| Continuous Batching | 连续批处理调度 | max batch size, 平均输入/输出长度 |
| Speculative Decoding | draft-then-verify | draft 长度 γ, 接受率, draft/target 速度比 |
| Context Window Extension | Overview / YaRN / NTK-aware Scaling | 原始上下文, 目标上下文, RoPE base |
| Attention Sink | Sink Pattern / StreamingLLM / Heavy Hitters(H2O) | seq_len, window size, sink tokens, heads |
| Gradient Checkpointing | None / Every Layer / Every √N / Recompute vs Offload | 层数, d_model, seq len, batch size |
| Mixed Precision (AMP) | BF16 / FP16 / FP8(E4M3) | d_model, 层数 |
| GPU Memory Calculator | Training / Inference × FP32·FP16·INT8·INT4 | d_model, layers, heads, vocab, seq len, batch, TP, PP |
| Training Performance | Calculator / Loss 曲线 / 梯度监控 / Step 时间拆解 / 异常诊断 | 模型与并行配置, GPU TFLOPS, 显存带宽, 互联(NVLink/PCIe/IB) |
| Config Generator | GPU: A100-40GB / A100-80GB / H100 / H200 | d_model, layers, heads, kv_heads, vocab, seq len, GPU 数, global batch |
| Scheduling | 请求调度 / PD 分离 / 集群作业 / 流水调度 / 数据加载 / KV 驱逐 / CPU-GPU Offload / 计算通信重叠 / Chunked Prefill(Sarathi) | 并发请求, GPU 数, pipeline stages, microbatches, KV blocks, prefill chunk size |
| GPU Memory & Roofline | Memory Hierarchy / Roofline / Kernel 示例；H100·A100·H200·L40S | d_model, seq len, batch size |
| Inference Serving | Engine 架构 / 请求生命周期 / 引擎对比 | workers(GPU), max batch size, KV cache blocks |
| Evaluation & Benchmarking | 服务指标 / 延迟拆解 / 压测工具 | prompt 长度, 输出长度, 并发请求, TP size |
| Structured Generation | 原理 / FSM 与 Token Masking / 实现对比 | — |
| Pruning & Sparsity | Overview / 2:4 结构化稀疏 / 方法对比 | 稀疏度(%), d_model |
| CUDA / Triton Kernels | GPU 执行模型 / Triton 编程 / 访存模式 | block size, warps |
| torch.compile & Graph Optimization | 编译流程 / 算子融合 / 后端对比 | — |
| Model Formats & Export | 格式对比 / 量化格式 / 转换流程 | 模型规模(B) |
## Training 训练（11）

| 子模块 | 算法/变体 | 可调参数 |
|---|---|---|
| RLHF / DPO / GRPO | PPO(RLHF) / DPO / GRPO / REINFORCE·RLOO / KTO / Online DPO | — |
| Pretrain Pipeline | 预训练流程 | d_model, 层数, micro-batch, seq len, grad accum steps |
| SFT | ChatML / Alpaca | max seq len, examples per pack |
| LoRA / QLoRA | LoRA / QLoRA | d_model, rank r, alpha α, 层数 |
| Reward Model | Bradley-Terry(pairwise) / Regression | d_model, 层数 |
| Optimizer | AdamW / SGD+Momentum / Lion | learning rate, β₁, β₂, weight decay |
| Knowledge Distillation | Logit KD(Hinton) / Feature KD / Online KD | temperature T, α(蒸馏权重) |
| LR Schedule | Cosine / Linear / WSD / Constant | warmup steps, total steps, min LR ratio |
| Scaling Laws | Chinchilla Optimal / FLOPs 估算 / Loss 预测 | 参数量(B), d_model, 层数, 训练 tokens(B), GPU 型号(H100/A100/H200), GPU 数, MFU |
| Gradient Accumulation | Basic / With DP / With PP | accum steps, micro batch size, GPU 数, pipeline stages |
| Checkpoint & Recovery | 策略对比 / Sharded State Dict / 容错 | GPU 数, 模型规模(B), checkpoint 间隔, TP, PP |

## Parallelism 并行（11）

| 子模块 | 算法/变体 | 可调参数 |
|---|---|---|
| Data Parallel | Naive DP / ZeRO Stage 1 / Stage 2 / Stage 3(FSDP) | world size, 模型参数量(B) |
| FSDP | Overview / Sharding Stages / Communication；ZeRO Stage 1·2·3 | 模型规模(B), GPU 数 |
| Tensor Parallel | 列并行 / 行并行切分 | TP size, d_model, FFN dim |
| Pipeline Parallel | GPipe / 1F1B / Interleaved 1F1B | PP size, 总层数, micro-batches |
| Sequence Parallel | Megatron-LM SP / SP vs TP 显存对比 / DeepSpeed Ulysses | TP size, seq len, d_model, heads, layers, batch |
| Context Parallel | 序列维切分（Ring） | CP size, seq len, d_model |
| Expert Parallel | 专家路由与 All2All | EP size, 总专家数, top-k, capacity factor |
| Hybrid Parallel | 3D / 5D 组合 | DP, TP, PP, EP, CP size |
| Communication Primitives | AllReduce / AllGather / ReduceScatter / Reduce / Gather / Scatter / Broadcast / All2All / Barrier / Send-Recv | GPU 数, 数据量(MB) |
| Network Topology & NCCL | 互联拓扑 / NCCL 算法 / 多机带宽；NVSwitch·NVLink P2P·PCIe | GPUs per node, 节点数 |
| Distributed Debugging | 常见故障 / NCCL 调试 / 调试工具 | 总 GPU 数, 节点数 |
## Multimodal 多模态（4）

| 子模块 | 算法/变体 | 可调参数 |
|---|---|---|
| Audio Encoder (Whisper) | Mel 特征 + Transformer Encoder | 采样率, mel 通道数, hidden dim, heads, layers, 音频长度(s) |
| Vision Encoder (ViT) | Patch Embedding + Transformer | 图像尺寸, patch size, hidden dim, heads, layers |
| Vision-Language Fusion | Cross-Attention / MLP Projector / Perceiver Resampler | 视觉 token 数, 文本 token 数, hidden dim, perceiver queries |
| DiT (Diffusion Transformer) | 时空 patch + DiT block | spatial size, 帧数, patch size, hidden dim, layers, heads |

## Models 整模型预设（14）

LLaMA-2-7B / 13B / 70B、LLaMA-3-8B / 70B、Qwen2-7B、Mixtral-8x7B、GPT-2(124M) / GPT-2 XL(1.5B)、DeepSeek-V2-Lite、Qwen2-VL-7B、Qwen2.5-Omni-7B、LLaVA-1.5-7B、Wan-2.1(DiT-1.3B)。


Section 2: Themes

用 Vite + TypeScript + D3 v7 搭一个概念图解 SPA。约定：每个知识点一个 `render{Id}Detailed(g, params)` 纯函数，画在 800px 宽画布上，用单一 `y` 游标从上往下累加布局，结尾返回 `{width, height}`。先实现一层共享原语（drawLabel / drawArrow / drawMatrixBlock / drawTensorGrid / drawBrace / drawDimBracket / drawStepBox / createStepGroup / drawExplanation / drawCodeAnnotation / drawComponentLink），所有绘制只能走原语。每页必须包含：标题+参数摘要、输入张量框、≥3 个带彩色编号圆圈的步骤（配色依次 #4caf50 #1976d2 #7b1fa2 #e65100 #d32f2f #00838f）、≥2 个语义解释框（insight 💡蓝 / math 📐紫 / perf ⚡橙 / warning ⚠️红，左侧 4px accent 条）、输出张量框、参数量与 FLOPs 汇总、结尾深色代码注解块。所有视觉尺寸从 params 推导，张量形状统一写作 monospace 的 `[b, seq, d]`。语义配色：数据绿 #e8f5e9/#4caf50、权重蓝 #e3f2fd/#1976d2、算子橙 #fff3e0/#f57c00、箭头 #78909c、标注灰 #999。暗色模式用 `filter: invert(0.85) hue-rotate(180deg)` 整体反转、代码块二次反转。交互：d3.zoom(0.2~4) + fit-to-view、data-tooltip 悬浮提示、按 data-step 逐步播放、SVG/PNG 导出。
