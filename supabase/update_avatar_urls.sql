-- 更新历史人物头像URL脚本
-- 在Supabase SQL编辑器中执行此脚本更新现有数据的头像URL

-- 更新历史人物头像URL
UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/qinshihuang_ai_portrait.jpg'
WHERE name = '秦始皇';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/hanwudi_ai_portrait.jpg'
WHERE name = '汉武帝';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/zhugeliang_ai_portrait.jpg'
WHERE name = '诸葛亮';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/tangtaizong_ai_portrait.jpg'
WHERE name = '唐太宗';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/libai_ai_portrait.jpg'
WHERE name = '李白';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/sushi_ai_portrait.jpg'
WHERE name = '苏轼';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/genghiskhan_ai_portrait.jpg'
WHERE name = '成吉思汗';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/zhuyuanzhang_ai_portrait.jpg'
WHERE name = '朱元璋';

UPDATE historical_figures 
SET image_url = 'https://ai-public.mastergo.com/ai/img_res/kangxi_ai_portrait.jpg'
WHERE name = '康熙帝';

-- 验证更新结果
SELECT name, image_url 
FROM historical_figures 
WHERE name IN ('秦始皇', '汉武帝', '诸葛亮', '唐太宗', '李白', '苏轼', '成吉思汗', '朱元璋', '康熙帝');

-- 显示更新统计
SELECT '头像URL更新完成！' as message, 
       COUNT(*) as updated_records 
FROM historical_figures 
WHERE image_url LIKE 'https://ai-public.mastergo.com/ai/img_res/%';