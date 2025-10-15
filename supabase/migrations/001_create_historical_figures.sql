-- 创建历史人物相关表结构

-- 启用向量扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 历史时期表
CREATE TABLE historical_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    start_year INTEGER,
    end_year INTEGER,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 历史人物表
CREATE TABLE historical_figures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    alias VARCHAR(200)[],
    birth_year INTEGER,
    death_year INTEGER,
    period_id UUID REFERENCES historical_periods(id),
    nationality VARCHAR(100),
    occupation VARCHAR(200)[],
    achievements TEXT,
    biography TEXT,
    image_url VARCHAR(500),
    vector_embedding VECTOR(1536),
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 人物关系表
CREATE TABLE figure_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    figure_id UUID REFERENCES historical_figures(id),
    related_figure_id UUID REFERENCES historical_figures(id),
    relationship_type VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户收藏表
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    figure_id UUID REFERENCES historical_figures(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, figure_id)
);

-- 搜索历史表
CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    query TEXT NOT NULL,
    results_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建向量搜索函数
CREATE OR REPLACE FUNCTION match_figures(
    query_embedding VECTOR(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    biography TEXT,
    similarity FLOAT
)
LANGUAGE SQL
AS $$
    SELECT
        id,
        name,
        biography,
        1 - (vector_embedding <=> query_embedding) AS similarity
    FROM historical_figures
    WHERE 1 - (vector_embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
$$;

-- 启用行级安全
ALTER TABLE historical_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_figures ENABLE ROW LEVEL SECURITY;
ALTER TABLE figure_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- 创建策略（允许公开读取）
CREATE POLICY "允许公开读取历史时期" ON historical_periods
    FOR SELECT USING (true);

CREATE POLICY "允许公开读取历史人物" ON historical_figures
    FOR SELECT USING (true);

CREATE POLICY "允许公开读取人物关系" ON figure_relationships
    FOR SELECT USING (true);

-- 用户相关策略
CREATE POLICY "用户只能管理自己的收藏" ON user_favorites
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "用户只能查看自己的搜索历史" ON search_history
    FOR ALL USING (auth.uid() = user_id);

-- 创建索引
CREATE INDEX idx_figures_period ON historical_figures(period_id);
CREATE INDEX idx_figures_popularity ON historical_figures(popularity_score DESC);
CREATE INDEX idx_figures_embedding ON historical_figures USING ivfflat (vector_embedding vector_cosine_ops);
CREATE INDEX idx_relationships_figure ON figure_relationships(figure_id);
CREATE INDEX idx_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_search_history_user ON search_history(user_id);

-- 插入示例数据
INSERT INTO historical_periods (name, start_year, end_year, description) VALUES
    ('古代文明', -3000, 476, '人类早期文明的兴起和发展时期'),
    ('中世纪', 476, 1453, '欧洲封建制度盛行的时期'),
    ('文艺复兴', 1300, 1600, '欧洲文化艺术的复兴时期'),
    ('近现代', 1453, 1945, '工业革命和现代国家形成的时期'),
    ('当代', 1945, NULL, '第二次世界大战后的时期');

INSERT INTO historical_figures (name, period_id, birth_year, death_year, nationality, occupation, achievements, biography, image_url) VALUES
    (
        '孔子',
        (SELECT id FROM historical_periods WHERE name = '古代文明'),
        -551,
        -479,
        '中国',
        ARRAY['思想家', '教育家'],
        '儒家学派创始人，提出"仁"的思想，编纂《诗经》《尚书》等经典',
        '孔子，名丘，字仲尼，春秋时期鲁国人。他是中国古代伟大的思想家、教育家，儒家学派的创始人。孔子主张"仁政"和"礼治"，强调道德修养和社会秩序。他的思想对中国乃至东亚文化产生了深远影响。',
        'https://ai-public.mastergo.com/ai/img_res/748cd4bf534805709361e0d0e72fd2be.jpg'
    ),
    (
        '列奥纳多·达·芬奇',
        (SELECT id FROM historical_periods WHERE name = '文艺复兴'),
        1452,
        1519,
        '意大利',
        ARRAY['画家', '发明家', '工程师'],
        '创作《蒙娜丽莎》《最后的晚餐》，在解剖学、工程学等领域有重要贡献',
        '达·芬奇是文艺复兴时期最杰出的代表人物之一，他不仅在绘画艺术上成就卓著，还在科学、解剖学、工程学等多个领域都有深入研究。他的作品和思想体现了文艺复兴时期的人文主义精神。',
        'https://ai-public.mastergo.com/ai/img_res/d81dfd0b13aac92300582fd1493e5e35.jpg'
    ),
    (
        '玛丽·居里',
        (SELECT id FROM historical_periods WHERE name = '近现代'),
        1867,
        1934,
        '波兰',
        ARRAY['物理学家', '化学家'],
        '发现镭和钋元素，两次获得诺贝尔奖，开创放射性研究',
        '居里夫人是著名的物理学家和化学家，她是第一个获得诺贝尔奖的女性，也是唯一一个在两个不同科学领域获得诺贝尔奖的人。她的研究为原子物理学的发展奠定了基础。',
        'https://ai-public.mastergo.com/ai/img_res/aced606e406c9cf3bb146a2dfa65d6f7.jpg'
    );

-- 创建更新时间的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_historical_periods_updated_at 
    BEFORE UPDATE ON historical_periods 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historical_figures_updated_at 
    BEFORE UPDATE ON historical_figures 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();