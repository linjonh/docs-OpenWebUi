---
sidebar_position: 6
title: "🎨 Генерация изображений"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для конкретного использования. Хотите внести вклад? Ознакомьтесь с учебником по внесению изменений.
:::

# 🎨 Генерация изображений

Open WebUI поддерживает генерацию изображений с помощью трех систем: **AUTOMATIC1111**, **ComfyUI** и **OpenAI DALL·E**. В этом руководстве показано, как настроить и использовать одну из этих систем.

## AUTOMATIC1111

Open WebUI поддерживает генерацию изображений с помощью [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) **AUTOMATIC1111**. Вот шаги для начала работы:

### Начальная настройка

1. Убедитесь, что у вас установлена [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui).
2. Запустите AUTOMATIC1111 с дополнительными флагами для доступа к API:

   ```
   ./webui.sh --api --listen
   ```

3. Для установки WebUI через Docker с предварительно установленными переменными окружения используйте следующую команду:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Настройка Open WebUI с AUTOMATIC1111

1. В Open WebUI перейдите в меню **Панель администратора** > **Настройки** > **Изображения**.
2. Установите поле `Image Generation Engine` в значение `Default (Automatic1111)`.
3. В поле URL API введите адрес, по которому доступен API AUTOMATIC1111:

   ```
   http://<your_automatic1111_address>:7860/
   ```

   Если вы используете установку Open WebUI через Docker и AUTOMATIC1111 на одном сервере, используйте адрес `http://host.docker.internal:7860/`.

## ComfyUI

ComfyUI предоставляет альтернативный интерфейс для управления и взаимодействия с моделями генерации изображений. Подробнее узнать или скачать его можно на [GitHub](https://github.com/comfyanonymous/ComfyUI). Следуйте приведенным ниже инструкциям для настройки ComfyUI.

### Начальная настройка

1. Скачайте и распакуйте программный пакет ComfyUI с [GitHub](https://github.com/comfyanonymous/ComfyUI) в желаемую директорию.
2. Для запуска ComfyUI выполните следующую команду:

   ```
   python main.py
   ```

   Для систем с низким объемом видеопамяти запустите ComfyUI с дополнительными флагами для уменьшения использования памяти:

   ```
   python main.py --lowvram
   ```

3. Для установки WebUI через Docker с предварительно установленными переменными окружения используйте следующую команду:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Настройка Open WebUI с ComfyUI

#### Настройка моделей FLUX.1

1. **Контрольные точки модели**:

* Скачайте модели `FLUX.1-schnell` или `FLUX.1-dev` с [HuggingFace black-forest-labs](https://huggingface.co/black-forest-labs).
* Разместите контрольные точки модели в директориях `models/checkpoints` и `models/unet` ComfyUI. Альтернативно, создайте символическую ссылку между `models/checkpoints` и `models/unet`, чтобы обе директории содержали те же контрольные точки.

2. **Модель VAE**:

* Скачайте `ae.safetensors` VAE [отсюда](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors).
* Поместите файл в директорию `models/vae` ComfyUI.

3. **Модель CLIP**:

* Скачайте `clip_l.safetensors` [отсюда](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main).
* Поместите файл в директорию `models/clip` ComfyUI.

4. **Модель T5XXL**:

* Скачайте модели `t5xxl_fp16.safetensors` или `t5xxl_fp8_e4m3fn.safetensors` [отсюда](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main).
* Поместите файл в директорию `models/clip` ComfyUI.

Чтобы интегрировать ComfyUI в Open WebUI, выполните следующие шаги:

#### Шаг 1: Настройка параметров Open WebUI

1. Перейдите в **Панель администратора** Open WebUI.
2. Нажмите **Настройки** и выберите вкладку **Изображения**.
3. В поле `Image Generation Engine` выберите `ComfyUI`.
4. В поле **API URL** введите адрес, по которому доступен API ComfyUI, в следующем формате: `http://<your_comfyui_address>:8188/`.
   * Установите переменную окружения `COMFYUI_BASE_URL` на этот адрес, чтобы она сохранялась в WebUI.

#### Шаг 2: Проверьте соединение и включите генерацию изображений

1. Убедитесь, что ComfyUI запущен, и вы успешно проверили соединение с Open WebUI. Без успешного соединения продолжить невозможно.
2. После проверки соединения включите **Генерацию изображений (Экспериментально)**. Вам будут доступны дополнительные параметры.
3. Перейдите к шагу 3 для завершающих шагов конфигурации.

#### Шаг 3: Настройка параметров ComfyUI и импорт рабочей схемы

1. Включите режим разработчика в ComfyUI. Для этого найдите значок шестеренки над кнопкой **Queue Prompt** в ComfyUI и включите переключатель `Dev Mode`.
2. Экспортируйте нужную рабочую схему из ComfyUI в формате `API format`, используя кнопку `Save (API Format)`. Если все выполнено правильно, файл будет загружен как `workflow_api.json`.
3. Вернитесь в Open WebUI и нажмите кнопку **Click here to upload a workflow.json file**.
4. Выберите файл `workflow_api.json`, чтобы импортировать рабочую схему из ComfyUI в Open WebUI.
5. После импорта рабочей схемы необходимо сопоставить узлы рабочей схемы ComfyUI с импортированными ID узлов.
6. Установите `Set Default Model` на имя используемой модели, например `flux1-dev.safetensors`.

:::info
Возможно, вам потребуется настроить один или два `Input Key` в разделе `ComfyUI Workflow Nodes` Open WebUI, чтобы они соответствовали узлу в вашей рабочей схеме.
Например, `seed` может быть переименован в `noise_seed`, чтобы соответствовать ID узла в импортированной рабочей схеме.
:::
:::tip
Некоторые рабочие схемы, например те, которые используют одну из моделей Flux, могут требовать заполнения нескольких ID узлов для их полей ввода узлов в Open WebUI. Если поле ввода узла требует несколько ID, они должны быть разделены запятыми (например, `1` или `1, 2`).
:::

6. Нажмите `Save`, чтобы сохранить настройки и наслаждаться генерацией изображений с использованием ComfyUI в Open WebUI!

После выполнения этих шагов ваша настройка ComfyUI должна быть интегрирована с Open WebUI, и вы сможете использовать модели Flux.1 для генерации изображений.

### Настройка с использованием SwarmUI

SwarmUI использует ComfyUI как бэкэнд. Чтобы заставить Open WebUI работать с SwarmUI, вам нужно добавить `ComfyBackendDirect` в `ComfyUI Base URL`. Кроме того, вы должны настроить SwarmUI для доступа через LAN. После указанных выше настроек настройка SwarmUI для работы с Open WebUI будет аналогичной шагу [Шаг первый: Настройка параметров Open WebUI](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings), описанному выше.
![Установите SwarmUI с доступом через LAN](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### URL API SwarmUI

Адрес, который вы введете как ComfyUI Base URL, будет выглядеть так: `http://<your_swarmui_address>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUI также поддерживает генерацию изображений через **OpenAI DALL·E APIs**. Этот вариант включает селектор для выбора между DALL·E 2 и DALL·E 3, каждая из которых поддерживает различные размеры изображений.

### Первоначальная настройка

1. Получите [API-ключ](https://platform.openai.com/api-keys) у OpenAI.

### Настройка Open WebUI

1. В Open WebUI перейдите в меню **Admin Panel** > **Settings** > **Images**.
2. Установите значение `Image Generation Engine` в `Open AI (Dall-E)`.
3. Введите ваш API-ключ OpenAI.
4. Выберите модель DALL·E, которую вы хотите использовать. Обратите внимание, что варианты размеров изображений зависят от выбранной модели:
   * **DALL·E 2**: Поддерживает изображения размером `256x256`, `512x512` или `1024x1024`.
   * **DALL·E 3**: Поддерживает изображения размером `1024x1024`, `1792x1024` или `1024x1792`.

### Azure OpenAI

Прямое использование Azure OpenAI DALL-E не поддерживается, но вы можете [настроить прокси LiteLLM](https://litellm.vercel.app/docs/image_generation), который совместим с механизмом генерации изображений `Open AI (Dall-E)`.

## Использование генерации изображений

![Учебное пособие по генерации изображений](/images/tutorial_image_generation.png)

1. Сначала используйте модель генерации текста для написания запроса на генерацию изображения.
2. После завершения ответа вы можете нажать на значок изображения, чтобы сгенерировать изображение.
3. После завершения генерации изображения оно будет автоматически возвращено в чат.

:::tip
    Вы также можете отредактировать ответ LLM и ввести свой запрос на генерацию изображения в виде сообщения,
    чтобы отправить его для генерации изображения вместо использования фактического ответа, предоставленного
    LLM.
:::
