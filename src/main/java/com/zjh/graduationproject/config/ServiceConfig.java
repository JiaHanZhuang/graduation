package com.zjh.graduationproject.config;



import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * @author zjh
 */
@Configuration
@Import({DruidDataSourceConfig.class})
@ComponentScan("com.zjh.graduationproject.service")
public class ServiceConfig {

}
