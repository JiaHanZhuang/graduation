package com.zjh.graduationproject.filter;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 处理xss攻击的过滤器
 * @author Admin
 * 2018年5月23日16:12:26
 * 作者：zzzgd_666
 *来源：CSDN
 * 原文：https://blog.csdn.net/zzzgd_666/article/details/80423364?utm_source=copy
 *
 */
public class RequestFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 将request通过自定义的装饰类进行装饰
        XssRequestWrapper xssRequest = new XssRequestWrapper((HttpServletRequest) request);
        filterChain.doFilter(xssRequest, response);
    }

}


