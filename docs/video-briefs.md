# AI Video Generation Briefs — TheYarnHook

Produced in **Phase 6** via the `ai-video-generation` team role.
Platform target: **RunComfy CLI** (`@runcomfy/cli`) using Arena #1 and flagship cinematic video models.

---

## Technical Specifications
- **Format**: MP4 (H.264 / AAC), native 1080p (1920×1080) and 1:1 (1080×1080) crops.
- **Duration**: 4.0 seconds (120 frames at 30 fps), seamlessly loop-safe (last frame fades/matches frame 0).
- **Audio**: Muted in web player (`muted`, `playsinline`, `loop`, `autoplay`).
- **Web Delivery**: Fallback to high-resolution SVG/AVIF poster on devices with data-saver or `prefers-reduced-motion`.

---

## 1. DESIRE Collection — "Velvet Ember & Wine Silk"
- **Model Recommendation**: `kling/kling-3.0/4k/text-to-video` (Hero shot delivery) or `happyhorse/happyhorse-1-0/text-to-video`.
- **Prompt**:
  > "Cinematic macro shot of deep crimson wine-dark velvet yarn skein unspooling in ultra-slow motion. Rich burgundy and rose-petal silk fibers catching warm candlelight. Luxurious velvet texture, soft shallow depth of field, photorealistic 8k, tactile, smooth looping motion, elegant studio lighting, no human hands, 120fps slow motion feel."
- **Negative Prompt**:
  > "fast motion, jitter, glitch, low resolution, plastic sheen, cartoon, synthetic, cluttered background, oversaturated neon."
- **RunComfy CLI Invocation**:
  ```bash
  runcomfy run kling/kling-3.0/4k/text-to-video \
    --input '{
      "prompt": "Cinematic macro shot of deep crimson wine-dark velvet yarn skein unspooling in ultra-slow motion. Rich burgundy and rose-petal silk fibers catching warm candlelight. Soft shallow depth of field, photorealistic, seamless loop.",
      "duration": 4,
      "aspect_ratio": "16:9",
      "cfg_scale": 0.65
    }' \
    --output-dir ./public/media/desire/
  ```

---

## 2. MILKA Collection — "Café Morning & Oat Comfort"
- **Model Recommendation**: `bytedance/seedance-v2/pro` (Cinematic motion refinement) or `happyhorse/happyhorse-1-0/text-to-video`.
- **Prompt**:
  > "Close-up cinematic macro of milk-tea cream and warm oat organic cotton yarn gently turning on a handcrafted wooden spindle. Diffused Sunday morning sunlight pouring across gentle beige and caramel fibers. Soft comforting atmosphere, tactile fuzz, pristine focus, seamless loop, 4k resolution."
- **Negative Prompt**:
  > "harsh shadows, high contrast, artificial colors, nylon sheen, jerky movement, camera shake."
- **RunComfy CLI Invocation**:
  ```bash
  runcomfy run bytedance/seedance-v2/pro \
    --input '{
      "prompt": "Close-up cinematic macro of milk-tea cream and warm oat cotton yarn gently turning on a wooden spindle. Diffused morning sunlight across caramel fibers. Seamless loop, 4k.",
      "duration": 4,
      "aspect_ratio": "16:9"
    }' \
    --output-dir ./public/media/milka/
  ```

---

## 3. SOUFFLE Collection — "Butter & Apricot Loft"
- **Model Recommendation**: `wan-ai/wan-2-7/text-to-video` or `happyhorse/happyhorse-1-0/text-to-video`.
- **Prompt**:
  > "Airy, floating skeins of pastel butter-yellow and warm peach soufflé yarn floating in zero gravity against a warm cream backdrop. Whisps of light acrylic-cotton loft expanding gently in a warm breeze. Weightless, dreamy, sculptural softness, pastel glow, seamless continuous loop."
- **Negative Prompt**:
  > "heavy, dark shadows, dull colors, static, fast falling, abrupt cuts, sharp edges."
- **RunComfy CLI Invocation**:
  ```bash
  runcomfy run wan-ai/wan-2-7/text-to-video \
    --input '{
      "prompt": "Airy skeins of pastel butter-yellow and warm peach soufflé yarn gently floating against a warm cream background. Weightless, sculptural softness, dreamy glow, seamless loop.",
      "duration": 4,
      "aspect_ratio": "16:9"
    }' \
    --output-dir ./public/media/souffle/
  ```

---

## 4. PLUSH LUXE Collection — "Midnight Plum & Brass Glow"
- **Model Recommendation**: `kling/kling-3.0/4k/text-to-video` (4K contrast and velvet rendition).
- **Prompt**:
  > "High-end luxury editorial shot of midnight plum chunky chenille yarn resting on dark slate. A single delicate strand of warm spun brass thread entwined with the deep violet wool catching directional studio rim-light. Tactile depth, opulent richness, velvet micro-texture, subtle breathing camera movement, seamless loop."
- **Negative Prompt**:
  > "bright neon, washed out, grey tones, low contrast, noisy, rough plastic, glitch."
- **RunComfy CLI Invocation**:
  ```bash
  runcomfy run kling/kling-3.0/4k/text-to-video \
    --input '{
      "prompt": "Luxury editorial macro of midnight plum chunky chenille yarn with spun brass thread catching directional rim light. Opulent velvet depth, slow breathing motion, seamless loop.",
      "duration": 4,
      "aspect_ratio": "16:9"
    }' \
    --output-dir ./public/media/plush-luxe/
  ```

---

## Production Fallback & Static Posters
Until credentials are configured via `runcomfy login`, the front-end automatically utilizes:
1. Pure SVG loop animations rendered in the browser.
2. SVG/Canvas responsive posters matching the palette of each collection.
3. CSS smooth breathing transformations respecting `prefers-reduced-motion`.
