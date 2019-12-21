package com.zjh.graduationproject.utils;

import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.MovieType;

import java.util.List;

/**
 * @author zjh
 * @date 2019/10/21
 * 计算两个电影的内容相似度
 */
public class MovieSimilarityUtil {


    public static float compare(List<MovieType> m1,List<MovieType> m2){
        //相似类型的个数
        int similarityNumber = 0;
        int typeId1;
        int typeId2;
        for(int x = 0;x < m1.size();x++) {
            for(int y = 0;y < m2.size();y++) {
                typeId1 = m1.get(x).getId();
                typeId2 = m2.get(y).getId();
                if(typeId1 == typeId2) {
                    similarityNumber +=1;
                }
            }
        }
        float similarity = (float) similarityNumber/m1.size();
        return similarity;
    }


}
