package com.zjh.graduationproject.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 *<p>Title: DruidDataSourceConfig.java</p>
 *<p>Description: 数据源属性配置</p>
 *<p>CreateDate: 2017年5月18日</p>
 *@author shen
 *@version v1.0
 */
@PropertySource(value = "classpath:config/application.yml")
@EnableConfigurationProperties({DruidDataSourceConfig.class})
@ConfigurationProperties(prefix = "spring.datasource")
@Configuration
//在同样的DataSource中，首先使用被标注的DataSource
@Primary
public class DruidDataSourceConfig extends DataSourceProperties {

    private Logger logger = LoggerFactory.getLogger(DruidDataSourceConfig.class);

    @Value("${url}")
    private String url;

    @Value("${name}")
    private String username;

    @Value("${password}")
    private String password;

    @Value("${driver-class-name}")
    private String driverClassName;

    @Value("${initialSize}")
    private Integer initialSize;

    @Value("${minIdle}")
    private Integer minIdle;

    @Value("${maxActive}")
    private Integer maxActive;

    @Value("${maxWait}")
    private Integer maxWait;

    @Value("${timeBetweenEvictionRunsMillis}")
    private Integer timeBetweenEvictionRunsMillis;

    @Value("${minEvictableIdleTimeMillis}")
    private Integer minEvictableIdleTimeMillis;

    @Value("${validationQuery}")
    private String validationQuery;

    @Value("${testWhileIdle}")
    private Boolean testWhileIdle;

    @Value("${testOnBorrow}")
    private Boolean testOnBorrow;

    @Value("${testOnReturn}")
    private Boolean testOnReturn;

    @Value("${poolPreparedStatements}")
    private Boolean poolPreparedStatements;

    @Value("${maxPoolPreparedStatementPerConnectionSize}")
    private Integer maxPoolPreparedStatementPerConnectionSize;

    @Value("${filters}")
    private  String filters;

    @Value("${connectionProperties}")
    private String connectionProperties;

    @Value("${type}")
    private String type;

    @Bean
    public DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();

        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName(driverClassName);
        dataSource.setInitialSize(initialSize);
        dataSource.setMinIdle(minIdle);
        dataSource.setMaxActive(maxActive);
        dataSource.setMaxWait(maxWait);
        dataSource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
        dataSource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
        dataSource.setValidationQuery(validationQuery);
        dataSource.setTestWhileIdle(testWhileIdle);
        dataSource.setTestOnBorrow(testOnBorrow);
        dataSource.setTestOnReturn(testOnReturn);
        dataSource.setPoolPreparedStatements(poolPreparedStatements);
        dataSource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
        try{
            dataSource.setFilters(filters);
        }catch (SQLException e) {
            logger.error("druid configuration initialization filter", e);
        }
        dataSource.setConnectionProperties(connectionProperties);

        return dataSource;
    }

}
