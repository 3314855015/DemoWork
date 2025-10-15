-- 历史人物平台示例数据
-- 在Supabase SQL编辑器中执行此脚本插入示例数据

-- 注意：历史时期和部分人物数据已在migration文件中创建，此处只插入不重复的数据

-- 2. 插入历史人物数据（避免与migration中重复的人物）
INSERT INTO historical_figures (name, alias, birth_year, death_year, period_id, nationality, occupation, achievements, biography, image_url, popularity_score) VALUES
('秦始皇', ARRAY['嬴政'], -259, -210, (SELECT id FROM historical_periods WHERE name = '古代文明'), '中国', ARRAY['政治家', '军事家'], '统一六国，建立秦朝，统一文字、货币、度量衡，修筑万里长城。', '中国历史上第一个完成大一统的皇帝，建立了中央集权制度。', 'https://example.com/qinshihuang.jpg', 92),
('汉武帝', ARRAY['刘彻'], -156, -87, (SELECT id FROM historical_periods WHERE name = '古代文明'), '中国', ARRAY['皇帝', '政治家'], '北击匈奴，开辟丝绸之路，独尊儒术，使汉朝达到鼎盛时期。', '西汉第七位皇帝，在位期间开疆拓土，加强中央集权。', 'https://example.com/hanwudi.jpg', 88),
('诸葛亮', ARRAY['孔明'], 181, 234, (SELECT id FROM historical_periods WHERE name = '古代文明'), '中国', ARRAY['政治家', '军事家', '发明家'], '辅佐刘备建立蜀汉政权，发明木牛流马、诸葛连弩，著有《出师表》等名篇。', '三国时期蜀汉丞相，杰出的政治家、军事家。', 'https://example.com/zhugeliang.jpg', 90),
('唐太宗', ARRAY['李世民'], 598, 649, (SELECT id FROM historical_periods WHERE name = '中世纪'), '中国', ARRAY['皇帝', '政治家'], '虚心纳谏，任人唯贤，使唐朝成为当时世界上最强大的国家。', '唐朝第二位皇帝，开创"贞观之治"。', 'https://example.com/tangtaizong.jpg', 87),
('李白', ARRAY['太白'], 701, 762, (SELECT id FROM historical_periods WHERE name = '中世纪'), '中国', ARRAY['诗人', '文学家'], '创作了大量脍炙人口的诗歌作品，如《将进酒》《蜀道难》等。', '唐代伟大的浪漫主义诗人，被誉为"诗仙"。', 'https://example.com/libai.jpg', 85),
('苏轼', ARRAY['子瞻', '东坡居士'], 1037, 1101, (SELECT id FROM historical_periods WHERE name = '中世纪'), '中国', ARRAY['文学家', '书画家', '政治家'], '诗词、散文、书法、绘画俱佳，代表作有《赤壁赋》《水调歌头》等。', '北宋文学家、书画家，唐宋八大家之一。', 'https://example.com/sushi.jpg', 86),
('成吉思汗', ARRAY['铁木真'], 1162, 1227, (SELECT id FROM historical_periods WHERE name = '中世纪'), '蒙古', ARRAY['军事家', '政治家'], '统一蒙古各部，建立蒙古帝国，发动大规模西征。', '蒙古帝国建立者，世界历史上著名的军事家。', 'https://example.com/genghiskhan.jpg', 89),
('朱元璋', ARRAY['重八'], 1328, 1398, (SELECT id FROM historical_periods WHERE name = '近现代'), '中国', ARRAY['皇帝', '军事家'], '推翻元朝统治，建立明朝，实行休养生息政策。', '明朝开国皇帝，出身贫寒的农民起义领袖。', 'https://example.com/zhuyuanzhang.jpg', 84),
('康熙帝', ARRAY['玄烨'], 1654, 1722, (SELECT id FROM historical_periods WHERE name = '近现代'), '中国', ARRAY['皇帝', '政治家'], '平定三藩之乱，统一台湾，抗击沙俄侵略，编纂《康熙字典》。', '清朝第四位皇帝，在位时间最长的中国皇帝。', 'https://example.com/kangxi.jpg', 83);

-- 3. 插入人物关系数据（只插入不重复的关系）
INSERT INTO figure_relationships (figure_id, related_figure_id, relationship_type, description) VALUES
((SELECT id FROM historical_figures WHERE name = '秦始皇'), (SELECT id FROM historical_figures WHERE name = '汉武帝'), '历史延续', '汉武帝继承和发展了秦始皇建立的中央集权制度。'),
((SELECT id FROM historical_figures WHERE name = '汉武帝'), (SELECT id FROM historical_figures WHERE name = '诸葛亮'), '历史影响', '汉武帝时期的政治制度对后世包括三国时期有深远影响。'),
((SELECT id FROM historical_figures WHERE name = '诸葛亮'), (SELECT id FROM historical_figures WHERE name = '唐太宗'), '历史传承', '诸葛亮作为忠臣典范，对后世君臣关系有重要影响。'),
((SELECT id FROM historical_figures WHERE name = '唐太宗'), (SELECT id FROM historical_figures WHERE name = '李白'), '文化繁荣', '唐太宗开创的盛世为李白等文人提供了创作环境。'),
((SELECT id FROM historical_figures WHERE name = '李白'), (SELECT id FROM historical_figures WHERE name = '苏轼'), '文学传承', '李白的浪漫主义诗风对苏轼等后世文人产生影响。'),
((SELECT id FROM historical_figures WHERE name = '苏轼'), (SELECT id FROM historical_figures WHERE name = '成吉思汗'), '历史交汇', '苏轼生活的北宋时期与成吉思汗的蒙古帝国有历史交集。'),
((SELECT id FROM historical_figures WHERE name = '成吉思汗'), (SELECT id FROM historical_figures WHERE name = '朱元璋'), '历史转折', '成吉思汗的蒙古帝国为元朝建立奠定基础，而朱元璋推翻了元朝。'),
((SELECT id FROM historical_figures WHERE name = '朱元璋'), (SELECT id FROM historical_figures WHERE name = '康熙帝'), '朝代延续', '朱元璋建立的明朝延续到康熙帝时期的清朝。');

-- 4. 插入用户收藏数据（示例）
INSERT INTO user_favorites (user_id, figure_id) VALUES
('00000000-0000-0000-0000-000000000001', (SELECT id FROM historical_figures WHERE name = '诸葛亮')),
('00000000-0000-0000-0000-000000000001', (SELECT id FROM historical_figures WHERE name = '李白')),
('00000000-0000-0000-0000-000000000001', (SELECT id FROM historical_figures WHERE name = '唐太宗'));

-- 5. 启用RLS策略（如果尚未启用）
-- 确保表已启用行级安全策略
ALTER TABLE historical_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_figures ENABLE ROW LEVEL SECURITY;
ALTER TABLE figure_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- 6. 创建RLS策略
-- 允许所有人读取历史时期
CREATE POLICY "允许所有人读取历史时期" ON historical_periods FOR SELECT USING (true);

-- 允许所有人读取历史人物
CREATE POLICY "允许所有人读取历史人物" ON historical_figures FOR SELECT USING (true);

-- 允许所有人读取人物关系
CREATE POLICY "允许所有人读取人物关系" ON figure_relationships FOR SELECT USING (true);

-- 用户只能管理自己的收藏
CREATE POLICY "用户管理自己的收藏" ON user_favorites FOR ALL USING (auth.uid() = user_id);

-- 7. 创建向量索引（用于智能搜索）
CREATE INDEX IF NOT EXISTS idx_figures_embedding ON historical_figures USING ivfflat (vector_embedding vector_cosine_ops);

-- 完成数据插入
SELECT '示例数据插入完成！' as message;